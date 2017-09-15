const express = require('express');
const router = express.Router();
const nconf = require('nconf');
const fs = require('fs');

router.get('/', (req, res) => {
  nconf.file('default',
    {file: './config.json'});


  // nconf.save(function (err) {
  //   fs.readFile('./testconfig.json', function (err, data) {
  //   });
  // });

  res.send(nconf.get('email:days') + '');
  console.log(nconf.get('email:message'));
});

module.exports = router;
