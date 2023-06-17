const express = require('express');
const req = require('./controllers/routes/contacts');
const app = express();
const dotenv = require('dotenv');
const parser = require('body-parser');
dotenv.config();

const mongodb = require('./controllers/db/connection');

const port = process.env.PORT || 8080;

// Use the body-parser middleware before the routes.
app.use(parser.json());

// Now use the routes.
app.use('/contacts', req);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT);
    console.log(`Connected to DB and listening on ${process.env.PORT}`);
  }
});
