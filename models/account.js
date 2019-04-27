const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

// Customer model
const Account = mongoose.model(config.get('database.account'), new mongoose.Schema({
    name: String,
    id: String,
    acn: String,
    date: Date,
    min: Number,
    total: Number,
    current: {type: Number, default: 0}
    }));

// Joi validation
const validateAccount = (accountInfo) => {
    const schema = {
            name: Joi.string().min(2).max(255).required(),
            id: Joi.string().length(5).required(),
            total: Joi.number().required(),
            min: Joi.number().required(),
            date: Joi.date().required()
    }
    return Joi.validate(accountInfo, schema);
}


exports.Account = Account;
exports.validate = validateAccount;