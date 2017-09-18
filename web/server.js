const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const {MongoClient, ObjectId} = require('mongodb');
const nconf = require('nconf');
const environment = require('./src/server/environment');

const path = require('path');
const bodyParser = require('body-parser');

const websocket = require('./src/server/routes/websocket');
const file = require('./src/server/routes/file');

// Desktop endpoints.
const volunteers = require('./src/server/routes/desktop/volunteers');

// Web endpoints.
const auth = require('./src/server/routes/web/auth');
const classifier = require('./src/server/routes/web/classifier');
const volunteer = require('./src/server/routes/web/volunteer');
const training = require('./src/server/routes/web/training');
const position = require('./src/server/routes/web/position');
const work = require('./src/server/routes/web/work');

// Endpoint for testing purposes.
const test = require('./src/server/routes/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

// Endpoint for testing purposes.
app.use('/api/test', test);

app.use('/api/websocket', websocket);
app.use('/api/file', file);

// Desktop endpoints.
app.use('/api/desktop/volunteers', volunteers);

// Web endpoints.
app.use('/api/web/auth', auth);
app.use('/api/web/classifier', classifier);
app.use('/api/web/volunteer', volunteer);
app.use('/api/web/training', training);
app.use('/api/web/position', position);
app.use('/api/web/work', work);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(3000, () => {
    console.log('Server is now running.');
});


function filterDueForReminder(callback) {
  nconf.file('default', {file: './config.json'});
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  MongoClient.connect(environment.url.mongodb)
    .then((db) => {
      return db.collection('volunteer');
    })
    .then((collection) => {
      return collection.find({$where: `((new Date(this.training.date) - new Date()) / ${milisecondsInDay}) >= ${nconf.get('email:days')}`}).toArray();
    })
    .then((result) => {
      callback(result);
    })
}

function sendReminderEmail(volunteer, transporter) {
  nconf.file('default', {file: './config.json'});
  const message = nconf.get('email:message');
  console.log('message: ', message);

  const mailOptions = {
    from: 'admin@architechs.us',
    to: volunteer.email,
    subject: 'Reminder of your upcoming training session',
    html: message
  };

  console.log('sendReminderemail');
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}


new CronJob('0 0 0 * * *', function() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    auth: { user: 'admin@architechs.us', pass: 'h4X=+Mdx2&' },
    secure: false,
    tls: { ciphers: 'SSLv3' }
  });

  filterDueForReminder((result) => {
    for (const volunteer of result) {

      sendReminderEmail(volunteer, transporter);
    }
  })
}, null, true, 'Pacific/Honolulu');
