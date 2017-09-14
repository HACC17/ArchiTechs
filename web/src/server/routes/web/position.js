const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const environment = require('../../environment');

router.post('/get', (req, res) => {
  const position = req.body;
  console.log(position);
  MongoClient.connect(environment.url.mongodb)
    .then((db) => {
      return db.collection('position').findOne({_id: ObjectId(position._id)});
    })
    .then((item) => {
      if (item) res.send(item);
      else res.send({});
    })
})

router.get('/list', (req, res) => {
  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('position').find().toArray((err, result) => {
      if (err) throw err;
      if (result) {
        res.send(result);
        db.close();
      }
    });
    db.close();
  });
});

module.exports = router;
