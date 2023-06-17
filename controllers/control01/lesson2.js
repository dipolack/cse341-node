const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

const getAll = async (req, res, next) => {
  const result = await getDb().db('contacts').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) =>{
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favColor: req.body.favColor,
    birthday: req.body.birthday,
  }
  const response = await getDb().db('Database').collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred creating contact.');
  }
};


const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await getDb()
    .db('contacts')
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred updating contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await getDb().db('contacts').collection('contacts').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred deleting the contact.');
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
