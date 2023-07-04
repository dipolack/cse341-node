const express = require('express');
const port = process.env.PORT || 8080;
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const jwt = require('jsonwebtoken');
const app = express();

const session = require('express-session');
const { initOAuth } = require('./oauth');

app.use(session({
  secret: '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', 
  resave: false,
  saveUninitialized: false
}));

const oAuth2Client = initOAuth();

app
  .use(bodyParser.json())
  .use(logger('dev'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

app.get('/auth/google', (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile'
  });
  res.redirect(url);
});

app.get('/auth/google/redirect', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Verify the token
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: '524162860155-qefbtrsccfiersp8abl7ikiih748sdao.apps.googleusercontent.com' 
  });
  const payload = ticket.getPayload();

  const jwtToken = jwt.sign(payload, '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', {
    expiresIn: '1h' // 1h should be okay??
  });

  req.session.jwt = jwtToken;

  res.redirect('/');
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
