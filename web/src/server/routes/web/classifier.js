const express = require('express');
const router = express.Router();

const natural = require('natural');

router.post('/classify', (req, res) => {
  const text = req.body.text;
  natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    console.log(classifier.getClassifications(text));
    res.send(classifier.classify(text));
  });
});

router.post('/train', (req, res) => {

})

module.exports = router;
