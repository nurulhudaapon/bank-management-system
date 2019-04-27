const express = require('express');
const router = express.Router();

const customerGetter = require('../utils/customergetter');

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
    let data = await customerGetter.get(req.query.id)
    res.render('user/myaccount', data);
    
    console.log(data.customer[0].accounts)
    
});

module.exports = router;

