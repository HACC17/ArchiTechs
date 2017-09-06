const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const testAccount = {name: 'Annie Kim', training: {}, email: 'test@test.com', password: 'test'};

router.post('/', (req, res) => {
  const token = req.body && req.body.token;
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.send('There is an error:', err);
      } else {

      }
    })
  }
});

module.exports = router;
