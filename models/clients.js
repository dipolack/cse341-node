var mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    contactInfo: { 
        email: { type: String, required: true },
        phone: { type: String, required: false }
    },
    registeredAt: { type: Date, default: Date.now },
    lastContacted: { type: Date, default: Date.now },
    accountManager: { type: String, required: true },
    location: { 
        address: { type: String, required: false },
        city: { type: String, required: false },
        country: { type: String, required: false }
    }
});

module.exports = mongoose.model('Client', clientSchema);
