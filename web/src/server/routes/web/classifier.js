const express = require('express');
const router = express.Router();

const natural = require('natural');

router.post('/classify', (req, res) => {
  const text = req.body.text;
  console.log(text);
  natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    console.log(classifier.getClassifications(text));
    res.send(classifier.classify(text));
  });
});

router.post('/train', (req, res) => {
  const documents = req.body.documents;
  natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    for (const document of documents) {
      classifier.addDocument(document.text, document.label);
    }


    classifier.train();
    classifier.save('classifier.json');

    res.send(classifier);
  });
});

router.get('/test', (req, res) => {
  natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {

    classifier.addDocument('can you suggest me a training date', 'suggest');
    classifier.addDocument('suggest me a training date please', 'suggest');




    classifier.train();
    classifier.save('classifier.json');

    res.send(classifier);
  });
})

module.exports = router;
