const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/admin';

const testAccount = {name: 'Annie Kim', training: {}, email: 'test@test.com', password: 'test'};

router.post('/', (req, res) => {
  const email = req.body && req.body.email;

  MongoClient.connect(url, (err, db) => {
    if (err) {
      res.send('Error connecting to database:', err);
      db.close();
    } else {
      db.collection('volunteers').findOne({email: email}, (err, item) => {
        if (err) {
          res.send('Error finding user:', err);
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

router.post('/login', (req, res) => {
  const credential = req.body;

  let data = {};
  // TODO: Tentative mock authentication system- switch to database based system.
  if (credential.email === testAccount.email && credential.password === testAccount.password) {
    // Sign and include a jwt token in the response data.
    const token = jwt.sign({name: testAccount.name, training: testAccount.training}, 'secret');
    data.token = token;
  }

  res.send(data);
});

module.exports = router;
