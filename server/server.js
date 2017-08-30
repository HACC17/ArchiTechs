const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(3000, () => {
    console.log('Server is now running.');
});
