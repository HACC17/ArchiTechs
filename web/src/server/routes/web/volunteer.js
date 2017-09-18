const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {MongoClient, ObjectId} = require('mongodb');
const environment = require('../../environment');
const nconf = require('nconf');

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
  nconf.file('default', {file: './config.json'});
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  MongoClient.connect(environment.url.mongodb)
    .then((db) => {
      return db.collection('volunteer');
    })
    .then((collection) => {
      console.log(nconf.get('email:days'));
      console.log((new Date('09-27-2017') - new Date()) / milisecondsInDay);
      return collection.find({$where: `((new Date(this.training.date) - new Date()) / ${milisecondsInDay}) >= ${nconf.get('email:days')}`}).toArray();
    })
    .then((result) => {
      callback(result);
    })
}

function sendReminderEmail(volunteer, transporter) {
  nconf.file('default', {file: './config.json'});
  const message = nconf.get('email:message');
  console.log('message: ', message);

  const mailOptions = {
    from: 'ijeong@mobileitforce.com',
    to: volunteer.email,
    subject: 'Reminder of your upcoming training session',
    html: message
  };

  console.log('sendReminderemail');
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

router.get('/send-all', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'secure169.inmotionhosting.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ijeong@mobileitforce.com',
      pass: ''
    }
  });

  res.setHeader('Content-Type', 'application/json');
  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('volunteer').find().toArray((err, result) => {
      if (err) throw err;
      if (result) {
        for (const volunteer of result) {
          console.log('in loop');

          sendReminderEmail(volunteer, transporter);
        }
        db.close();
      }
    });
    db.close();
  });
})

router.get('/remind', (req, res) => {
  console.log('remind called');
  const transporter = nodemailer.createTransport({
    host: 'secure169.inmotionhosting.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ijeong@mobileitforce.com',
      pass: ''
    }
  });

  filterDueForReminder((result) => {
    console.log(result);
    console.log('in filterdueforreminder callback');
    for (const volunteer of result) {
      console.log('in loop');

      sendReminderEmail(volunteer, transporter);
    }
    res.send('hi');
  })
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

router.get('/list', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('volunteer').find().toArray((err, result) => {
      if (err) throw err;
      if (result) {
        res.send(result);
        db.close();
      }
    });
    db.close();
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
