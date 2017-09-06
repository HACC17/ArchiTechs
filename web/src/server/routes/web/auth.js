const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const environment = require('../../environment');

// Determine whether account with email exists or not.
router.post('/', (req, res) => {
  const email = req.body && req.body.email;

  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) {
      res.send('Error connecting to database:' + err);
    } else {
      db.collection('volunteers').findOne({email: email}, (err, item) => {
        if (err) {
          res.send({});
          db.close();
        } else {
          let result = false;

          if (item) {
            result = true;
          }

          res.send({hasAccount: result});
          db.close();
        }
      });
    }
  });
});

// Authenticates a user then signs and sends a JWT token.
router.post('/login', (req, res) => {
  const credential = req.body;

  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) {
      res.send('Error connecting to database:' + err);
    } else {
      db.collection('volunteers').findOne({email: credential.email, password: credential.password}, (err, item) => {
        if (err) {
          res.send({});
          db.close();

        } else {
          let body = {};

          // Authentication successful (there is a user that matches the credentials).
          if (item) {
            // Sign and include a jwt token in the response data.
            body.token = jwt.sign({id: item._id}, 'secret');
          }

          // Send an empty body if authentication failed.
          res.send(body);
          db.close();
        }
      });
    }
  });
});

module.exports = router;
