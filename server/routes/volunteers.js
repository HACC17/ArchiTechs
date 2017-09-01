const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/admin';

router.get('/', (req, res) => {
    let list = [];
    MongoClient.connect(url, (err, db) => {
        console.log('Mongodb connected!');
        let cursor = db.collection('volunteers').find({});
        cursor.toArray((err, documents) => {
            for(let document of documents) {
            document.dob = document.dob.toDateString();
            }
            console.log(JSON.stringify(documents));
            res.send(JSON.stringify(documents));
            db.close();
        });
    });
});

module.exports = router;