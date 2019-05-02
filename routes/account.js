const express = require('express');
const router = express.Router();
const { Account, validate } = require('../models/account');
const { Customer } = require('../models/customer');
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

// Creating account
router.post('/', upload.none(), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(406).send(error.details[0].message);
    
    let accountInfo = req.body;

    accountInfo.name = accountInfo.customer.split(' - ')[0];
    accountInfo.id = accountInfo.customer.split(' - ')[1];

    let account = new Account(accountInfo);
    
    const customer = await Customer.findOneAndUpdate({ id: account.id }, {
        $push: {
            accounts: account._id
        }
    }, { new: true });
    
    account.acn = `${customer.id}${customer.accounts.length.toString().padStart(3, 0)}`;

    const result = await account.save();

    res.json(result);
});

// Getting account
router.get('/', async (req, res) => {
    const result = await Account.find().populate('deposits');
    res.send(result);
});

// Deleting account
router.delete('/:acn', async (req, res) => {
    const result = await Account.deleteOne({ acn: req.params.acn });
    res.send(result);
});

// Updating account
router.put('/:acn', upload.none(), async (req, res) => {
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
    res.json(result);
});

module.exports = router;

