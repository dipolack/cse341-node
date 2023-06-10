const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Christian Torres');
});

module.exports = routes;