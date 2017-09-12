const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

// Desktop endpoints.
const volunteers = require('./src/server/routes/desktop/volunteers');

// Web endpoints.
const signIn = require('./src/server/routes/web/auth');
const data = require('./src/server/routes/web/data');
const classifier = require('./src/server/routes/web/classifier');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

// Desktop endpoints.
app.use('/api/desktop/volunteers', volunteers);

// Web endpoints.
app.use('/api/web/auth', signIn);
app.use('/api/web/data', data);
app.use('/api/web/classifier', classifier);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(3000, () => {
    console.log('Server is now running.');
});
