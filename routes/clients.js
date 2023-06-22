const express = require('express');
var router = express.Router();

const clientsController = require('../clients/controllers/clients.js');

// CREATE
router.post('/', clientsController.createClient);

// READ (all)
router.get('/', clientsController.getAll);

// READ (one)
router.get('/:id', clientsController.getSingle);

// UPDATE
router.put('/:id', clientsController.updateClient);

// DELETE
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
