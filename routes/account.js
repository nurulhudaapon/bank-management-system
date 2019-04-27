const express = require('express');
const router = express.Router();
const { Account, validate } = require('../models/account');
const { Customer } = require('../models/customer');

router.use(express.json());

// Creating account
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    let accountInfo = req.body;
    if (error) return res.status(400).send(error.details[0].message);
    let account = new Account(accountInfo);
    const customer = await Customer.findOneAndUpdate({ id: account.id }, {
        $push: {
            accounts: account._id
        }
    }, { new: true });
    account.acn = `${customer.id}${customer.accounts.length}`
    const result = await account.save();
    res.send(result);
});

// Getting account
router.get('/', async (req, res) => {
    const result = await Account.find();
    res.send(result);
});

// Deleting account
router.delete('/:acn', async (req, res) => {
    const result = await Account.deleteOne({ acn: req.params.acn });
    res.send(result);
});

// Updating account
router.put('/:acn', async (req, res) => {
    let newInfo = req.body;
    const result = await Account.updateOne({ acn: req.params.acn }, {
        $set: {
            name: newInfo.name,
            phone: newInfo.phone,
            address: newInfo.address,
            acn: newInfo.acn,
            acc_date: newInfo.acc_date
        }
    });
    res.send(result);
});

module.exports = router;

