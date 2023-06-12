const mongodb = require('../db/connection');
const objectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db("contacts").collection('contacts').find();

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getContact = async (req, res, next) => {
    const id = new objectId (req.params.id);
    const result = await mongodb.getDb().db("contacts").collection('contacts').find({_id: id});

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  };

module.exports = {
    getContacts,
    getContact
}