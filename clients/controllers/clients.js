const mongodb = require('../../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Client = require('../../models/clients.js');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('clients').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('clients').find({ _id: clientId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createClient = async (req, res) => {
  const client = new Client({
    clientName: req.body.clientName,
    contactInfo: req.body.contactInfo,
    registeredAt: req.body.registeredAt,
    lastContacted: req.body.lastContacted,
    accountManager: req.body.accountManager,
    location: req.body.location,
    InvestmentAmount: req.body.InvestmentAmount // Adding 7th input
  });
  const response = await mongodb.getDb().db().collection('clients').insertOne(client);
  if (response.acknowledged) {
    res.status(201).json({
      response: response,
      message: "Created new Client successfully.",
      client: client
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the client.');
  }
};

const updateClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  const client = {
    clientName: req.body.clientName,
    contactInfo: req.body.contactInfo,
    registeredAt: req.body.registeredAt,
    lastContacted: req.body.lastContacted,
    accountManager: req.body.accountManager,
    location: req.body.location,
    InvestmentAmount: req.body.InvestmentAmount // Adding 7th input
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('clients')
    .replaceOne({ _id: clientId }, client);
  if (response.modifiedCount > 0) {
    res.status(204).json({
      response: response,
      message: "Updated client successfully.",
      client: client
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the client.');
  }
};


const deleteClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('clients').deleteOne({ _id: clientId }, true);
  if (response.deletedCount > 0) {
    res.status(200).json({
      response: response,
      message: "Deleted client successfully.",
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the client.');
  }
};

module.exports = { getAll, getSingle, createClient, updateClient, deleteClient };
