const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

// Customer model
const Customer = mongoose.model(config.get('database.customer'), new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    id: String,
    date: {type: Date, default: Date.now},
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dev-account'
    }]
    }));

// Joi validation
const validateCustomer = (customerInfo) => {
    const schema = {
            name: Joi.string().min(2).max(255).required(),
            phone: Joi.string().length(11).required(),
            address: Joi.string().min(2).max(255).required(),
            id: Joi.string().length(5).required(),
            date: Joi.date(),
            accounts: Joi.array()
    }
    return Joi.validate(customerInfo, schema);
}


exports.Customer = Customer;
exports.validate = validateCustomer;