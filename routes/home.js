const express = require('express');
const router = express.Router();

router.use(express.json());

// Home
router.get('/', async (req, res) => {
    res.render('user/home');
});
// Customers
const { Customer } = require('../models/customer');
router.get('/customers', async (req, res) => {
    let customers = await Customer.find();
    res.render('admin/customers', { customers });
});
// Accounts
const { Account } = require('../models/account');
router.get('/accounts', async (req, res) => {
    let accounts = await Account.find();
    res.render('admin/accounts', { accounts });
});
// My account
router.get('/myaccount', async (req, res) => {
    const query = req.query.id.toString();
    let t = query.length == 5 || query.length == 6
    if (!t) return res.status(406).send('Invalid ID or ACN');
    if (query.length == 5) {
        const result = await Customer.findOne({id: query}).select('-__v -_id').populate({
            path: 'accounts',
            select: '-__v -_id -id',
            populate: {
                path: 'deposits',
                select: '-_id -__v -name'
            }
        });
        if (!result) return res.status(404).send('No customer found.')
        res.render('user/customer', {result});
    }
    if (query.length == 6) {
        
        const result = await Account.findOne({acn: query}).select('-__v -_id').populate('deposits', '-__v -_id');
        if (!result) return res.status(404).send('No account found.')
        res.render('user/account', {result});
    }
});

module.exports = router;

