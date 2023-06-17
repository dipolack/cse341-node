const routes = require('express').Router();
const lesson2Controller = require('../control01/lesson2'); //corrected relative path

routes.get('/', lesson2Controller.getAll);
routes.get('/:id', lesson2Controller.getSingle);
routes.post('/', lesson2Controller.createContact);
routes.put('/:id', lesson2Controller.updateContact);
routes.delete('/:id', lesson2Controller.deleteContact);

module.exports = routes;