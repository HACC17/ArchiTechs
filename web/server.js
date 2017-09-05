const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

// Desktop endpoints.
const volunteers = require('./src/server/routes/desktop/volunteers');

// Web endpoints.
const signIn = require('./src/server/routes/web/sign-in');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

// Desktop endpoints.
app.use('/api/desktop/volunteers', volunteers);

// Web endpoints.
app.use('/api/web/sign-in', signIn);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(3000, () => {
    console.log('Server is now running.');
});
