const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

// Customer model
const Deposit = mongoose.model(config.get('database.deposit'), new mongoose.Schema({
    name: String,
    acn: String,
    date: Date,
    amount: Number,
    dBy: String,
    dTo: String,

    }));

// Joi validation
const validateDeposit = (depositInfo) => {
    const schema = {
            name: Joi.string().min(2).max(255).required(),
            acn: Joi.string().length(6).required(),
            amount: Joi.number().required(),
            dBy: Joi.string().max(255).min(2).required(),
            dTo: Joi.string().max(255).min(2).required(),
            date: Joi.date().required()
    }
    return Joi.validate(depositInfo, schema);
}


exports.Deposit = Deposit;
exports.validate = validateDeposit;