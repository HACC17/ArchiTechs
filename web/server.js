const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const volunteers = require('./src/server/routes/desktop/volunteers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

app.use('/volunteers', volunteers);

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(3000, () => {
    console.log('Server is now running.');
});
