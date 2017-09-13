const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'election'
});

function connect(callback) {
  if (con.state === 'disconnected') {
    con.connect((err) => {
      if (err) throw err;
      callback();
    });
  } else {
    callback();
  }
}

router.post('/get', (req, res) => {
  const token = req.body && req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) throw err;

    connect((err) => {
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

module.exports = router;
