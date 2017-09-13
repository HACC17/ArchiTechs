const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const environment = require('../../environment');

router.get('/list', (req, res) => {
  MongoClient.connect(environment.url.mongodb, (err, db) => {
    if (err) throw err;
    db.collection('work').find().toArray((err, result) => {
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
