const express = require('express');
const router = express.Router();
const {exec} = require('child_process');

router.ws('/', function(ws, req) {
  // ws.on('message', function(msg) {
  //   console.log(msg);
  // });
  // console.log('...');
  // console.log('socket', req.testing);

  /* AUTHENTICATION HERE */

  /* DB BACKUP */
  const mongodump = exec('mongodump -h db:27017 --verbose', (err, stdout, stderr) => {
    console.log('mongodump is completed');
    ws.terminate();
  });

  mongodump.stdout.on('data', (data) => {
    console.log(data);
    ws.send(data);
  });

  mongodump.stderr.on('data', (data) => {
    console.log(data);
    ws.send(data);
  });

  // setInterval(() => {
  //   ws.send('this is a test message from the server');
  // }, 5000);
});

module.exports = router;
