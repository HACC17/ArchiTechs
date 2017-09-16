const express = require('express');
const router = express.Router();
const fs = require('fs');
const nconf = require('nconf');

router.get('/get-settings', (req, res) => {

});

router.post('/save-settings', (req, res) => {
  const settings = req.body;
  nconf.file('default', {file: './config.json'});

  nconf.set('email:days', settings.days);
  nconf.set('email:message', settings.message);

  nconf.save((err) => {
    if (err) {
      res.send({result: false});
    } else {
      res.send({result: true});
    }
  });
});

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
