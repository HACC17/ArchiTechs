const express = require('express');
const router = express.Router();

const testAccount = {email: 'test@test.com'};

router.post('/', (req, res) => {
  const email = req.body && req.body.email;

  // True, there is an account with that email, or false, there is not.
  const data = {hasAccount: email === testAccount.email};
  res.send(data);
});

router.post('/login', (req, res) => {

})

module.exports = router;
