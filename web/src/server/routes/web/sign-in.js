const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const testAccount = {email: 'test@test.com', password: 'test'};

router.post('/', (req, res) => {
  const email = req.body && req.body.email;

  // True, there is an account with that email, or false, there is not.
  const data = {hasAccount: email === testAccount.email};
  res.send(data);
});

router.post('/login', (req, res) => {
  const credential = req.body;
  console.log(credential);
  console.log(testAccount);
  let data = {};
  if (credential.email === testAccount.email && credential.password === testAccount.password) {
    console.log('Yes');
    // Sign and include a jwt token in the response data.
    const token = jwt.sign({foo: 'bar'}, 'secret');
    data.token = token;
  }

  res.send(data);
});

module.exports = router;
