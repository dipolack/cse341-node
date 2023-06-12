const express = require('express');
const req = require('./routes/contacts');
const app = express();
const dotenv = require('dotenv');
const parser = require('body-parser');
dotenv.config();

const mongodb = require('./db/connection')

const port = process.env.PORT || 8080;

app.use('/contacts', req);
app.use(parser.json());
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT);
    console.log(`Connected to DB and listening on ${process.env.PORT}`);
  }
});
