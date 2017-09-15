const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  /* ---- NEED AUTHENTICATION HERE ----*/

  /* --------------------------------- */
  let directory = __dirname; // Might have user define the directory
  let list = [];
  fs.readdir(directory, (err, files) => {
    if(err) {
    } else {
      for (let file of files) {
        list.push({
          name: file
        });
      }
      res.send(list);
    }
  })
});

module.exports = router;
