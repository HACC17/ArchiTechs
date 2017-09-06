const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {MongoClient, ObjectId} = require('mongodb');
const environment = require('../../environment');

router.post('/get', (req, res) => {
  const token = req.body && req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (!err) {
      MongoClient.connect(environment.url.mongodb, (err, db) => {
        if (!err) {
          db.collection('volunteers').findOne({_id: ObjectId(decoded.id)}, (err, item) => {
            if (!err) {
              console.log(item);
              if (item) {
                delete item.password;
                res.send(item);
                db.close();
              }
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }

        db.close();
      });
    } else {
      console.log(err);
    }
  })

});

module.exports = router;
