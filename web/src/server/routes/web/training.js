const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const environment = require('../../environment');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'election'
});

router.post('/get', (req, res) => {
  const token = req.body && req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) throw err;

    con.connect((err) => {
      if (err) throw err;
      console.log('Connected message from volunteer/get.');
      const sql = "SELECT * FROM `volunteer`" +
        "WHERE email = ?";

      con.query(sql, decoded.email, (err, result) => {
        res.send(result[0]);
      });
    });
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
