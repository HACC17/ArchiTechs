const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const testAccount = {email: 'test@test.com'};
  const email = req.body && req.body.email;

  // True, there is an account with that email, or false, there is not.
  const data = {hasAccount: email === testAccount.email};
  req.send(data);
});

module.exports = router;
