const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {MongoClient, ObjectId} = require('mongodb');
const environment = require('../../environment');

//test
const natural = require('natural');

router.post('/get', (req, res) => {
  const token = req.body && req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (!err) {
      MongoClient.connect(environment.url.mongodb, (err, db) => {
        if (!err) {
          db.collection('volunteers').findOne({_id: ObjectId(decoded.id)}, (err, item) => {
            if (!err) {
              if (item) {
                delete item.password;
                res.send(item);
                db.close();
              }
            } else {
              console.log(err);
            }
          });
          db.close();
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
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

router.post('/test', (req, res) => {
  natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    res.send(classifier.classify('long SUNW'));
  });
});

module.exports = router;
