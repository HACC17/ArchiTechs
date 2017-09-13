const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res) => {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'election'
  });

  con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');

    // const sql = "INSERT INTO `volunteer` (`name`, `email`, `password`)" +
    //   "VALUES ('Brandon Lee', 'brandonlee@test.com', 'test')";

    const sql = "UPDATE `volunteer`" +
      "SET `training` = ?";

    con.query(sql, {'test': 'hi'}, (err, result) => {
      if (err) throw err;
      res.send('done');
    })
  })
});

module.exports = router;
