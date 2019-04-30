const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

// Customer model
const Account = mongoose.model(config.get('database.account'), new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    acn: {type: String, required: true, unique: true},
    date: {type: Date, required: true},
    min: {type: Number, required: true},
    total: {type: Number, required: true},
    current: {type: Number, default: 0},
    deposits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: config.get('database.deposit')
    }]
    }));

// Joi validation
const validateAccount = (accountInfo) => {
    const schema = {
            customer: Joi.string().min(2).max(255).required(),
            total: Joi.number().required(),
            min: Joi.number().required(),
            date: Joi.date().required(),
            deposits: Joi.array()
    }
    return Joi.validate(accountInfo, schema);
}


exports.Account = Account;
exports.validate = validateAccount;