const express = require('express');
const router = express.Router();
const fs = require('fs');
const nconf = require('nconf');

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


router.get('/download', (req, res) => {
  const directory = './dump/election/';
  res.download(directory + req.query.name);
});


router.get('/', (req, res) => {
  /* ---- NEED AUTHENTICATION HERE ----*/

  /* --------------------------------- */
  const directory = './dump/election';
  let list = [];
  fs.readdir(directory, (err, files) => {
    if(err) {
      res.send('There is an error:', err);
    } else {
      for (let file of files) {
        list.push({
          name: file,
          url: 'http://architechs.us/api/file/download?name=' + file
        });
      }
      res.send(JSON.stringify(list));
    }
  })
});

module.exports = router;
