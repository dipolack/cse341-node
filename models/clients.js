var mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    lastContacted: { type: Date, default: Date.now },
    accountManager: { type: String, required: true },
    location: { type: String, required: true },
    InvestmentAmount: { type: String, required:true},
});

module.exports = mongoose.model('Client', clientSchema);
