const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const {MongoClient, ObjectId} = require('mongodb');
const environment = require('../../environment');

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'admin',
//   database: 'election'
// });
//
// function connect(callback) {
//   if (con.state === 'disconnected') {
//     con.connect((err) => {
//       if (err) throw err;
//       callback();
//     });
//   } else {
//     callback();
//   }
// }

function filterDueForReminder(callback) {
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  MongoClient.connect(environment.url.mongodb)
    .then((db) => {
      return db.collection('volunteer');
    })
    .then((collection) => {
      return collection.find({$where: `((new Date(this.training.date) - new Date()) / ${milisecondsInDay}) >= 2`}).toArray();
    })
    .then((result) => {
      callback(result);
    })
}

function sendReminderEmail(volunteer) {
  console.log('hi')
}

router.get('/remind', (req, res) => {
  filterDueForReminder((result) => {
    for (const volunteer of result) {
      sendReminderEmail(volunteer);
    }
    res.send('hi');
  })
});

router.get('/test', (req, res) => {
  filterDueForReminder();
})

router.post('/get-mysql', (req, res) => {
  const token = req.body && req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) throw err;

    connect((err) => {
      if (err) throw err;

      console.log(decoded);
      console.log('Connected message from volunteer/get.');
      const sql = "SELECT * FROM `volunteer`" +
        "WHERE email = ?";

      con.query(sql, decoded.email, (err, result) => {
        res.send(result[0]);
      });
    });
  });
});


router.post('/get', (req, res) => {
  const token = req.body && req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) throw err;
    MongoClient.connect(environment.url.mongodb, (err, db) => {
      if (err) throw err;
      db.collection('volunteer').findOne({_id: ObjectId(decoded.id)}, (err, item) => {
        if (err) throw err;
        if (item) {
          res.send(item);
          db.close();
        }
      });
      db.close();
    });
  });
});

router.post('/update', (req, res) => {
  const token = req.body.token;
  const newPosition = req.body.user.position.name;
  console.log('newPosition,', newPosition);
  delete req.body.user._id;

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) throw err;
    MongoClient.connect(environment.url.mongodb, (err, db) => {
      if (err) throw err;

      db.collection('volunteer').findOne({_id: ObjectId(decoded.id)})
        .then((item) => {
          const oldPosition = item.position.name;
          console.log('oldPosition,', oldPosition);
          if (newPosition !== oldPosition) {
            return {newPosition: newPosition, oldPosition: oldPosition};
          }
          return {};
        })
        .then((positions) => {
          if (positions) {
            db.collection('volunteer').updateOne({_id: ObjectId(decoded.id)}, req.body.user);
            db.collection('position').update({name: positions.newPosition},
              {$inc: {staffingCurrent: 1}});
            db.collection('position').update({name: positions.oldPosition},
              {$inc: {staffingCurrent: -1}});
          }
        });
    });
  });
});


module.exports = router;
