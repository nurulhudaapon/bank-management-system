const express = require('express');
const router = express.Router();
const { Deposit, validate } = require('../models/deposit');
const { Account } = require('../models/account');

router.use(express.json());

// Creating user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let depositInfo = req.body;
    const deposit = new Deposit(depositInfo);

    const account = await Account.updateOne({ acn: deposit.acn }, {
        $inc: {
            current: deposit.amount
        }
    });

    const result = await deposit.save();
    res.send(result);
});

// Getting user
router.get('/', async (req, res) => {
    const result = await Deposit.find();
    res.send(result);
});

// Deleting user
router.delete('/:acn', async (req, res) => {
    const result = await Deposit.deleteOne({ acn: req.params.acn });
    res.send(result);
});

// Updating user
router.put('/:acn', async (req, res) => {
    let newInfo = req.body;
    const result = await Deposit.updateOne({ acn: req.params.acn }, {
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

