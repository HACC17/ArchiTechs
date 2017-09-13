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

router.get('/list-mysql', (req, res) => {
  connect((err) => {
    if (err) throw err;

    console.log('Connected message from training/list.');
    const sql = "SELECT * FROM `training`";

    con.query(sql, (err, result) => {
      res.send(result);
    });
  });
});

router.get('/list', (req, res) => {
  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('training').find().toArray((err, result) => {
      if (err) throw err;
      if (result) {
        res.send(result);
        db.close();
      }
    });
    db.close();
  });
});

router.post('/update-training', (req, res) => {
  const token = req.body.token;
  const training = req.body.training;
  console.log(req.body);
  jwt.verify(token, 'secret', (err, decoded) => {
    if (!err) {
      MongoClient.connect(environment.url.mongodb, (err, db) => {
        if (!err) {
          db.collection('volunteers').update({_id: ObjectId(decoded.id),},
            {$set: {training: training}}, (err, _res) => {
              if (!err) {
                console.log(_res);
                db.close();
              }
            })
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  })
});

module.exports = router;
