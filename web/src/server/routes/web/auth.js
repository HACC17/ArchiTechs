const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
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

// Determine whether account with email exists or not.
router.post('/verify-mysql', (req, res) => {
  const email = req.body && req.body.email;

  connect((err) => {
    if (err) throw err;
    console.log('Connected message from auth/verify.');
    const sql = "SELECT * FROM `volunteer`" +
      "WHERE email = ?";

    con.query(sql, email, (err, result) => {
      if (err) throw err;

      if (result[0]) res.send({result: true});
      else res.send({result: false});
    });
  });
});

// Authenticates a user then signs and sends a JWT token.
router.post('/login-mysql', (req, res) => {
  const credential = req.body;

  connect((err) => {
    if (err) throw err;
    console.log('Connected message from auth/login.');
    const sql = "SELECT * FROM `volunteer`" +
      "WHERE `email` = ? AND `password` = ?";

    con.query(sql, [credential.email, credential.password], (err, result) => {
      if (err) throw err;

      if (result[0]) {
        const token = jwt.sign({email: result[0].email}, 'secret');
        res.send({token: token});
      }

      else res.send({});
    });
  });
});

// Determine whether account with email exists or not.
router.post('/verify', (req, res) => {
  const email = req.body && req.body.email;

  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('volunteer').findOne({email: email}, (err, item) => {
      if (err) throw err;

      if (item) {
        res.send({result: true});
      } else {
        res.send({result: false});
      }

      db.close();
    });
  });
});

// Authenticates a user then signs and sends a JWT token.
router.post('/login', (req, res) => {
  const credential = req.body;

  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('volunteer').findOne({email: credential.email, password: credential.password}, (err, item) => {
      if (err) throw err;

      // Authentication successful (there is a user that matches the credentials).
      if (item) {
        // Sign and include a jwt token in the response data.
        const token = jwt.sign({id: item._id}, 'secret');
        res.send({token: token});
      } else {
        res.send({});
      }

      db.close();
    });
  });
});

module.exports = router;
