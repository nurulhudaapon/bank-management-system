const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');
const { Account } = require('../models/account');


router.use(express.json());

// Add New Page
router.get('/', async (req, res) => {
    res.render('admin/addNew');
});
// Customer
router.get('/customer', async (req, res) => {
    res.render('admin/customer');
});
// Getting user
router.get('/account', async (req, res) => {
    const customers = await Customer.find();
    res.render('admin/account', { customers });
});
// Getting user
router.get('/deposit', async (req, res) => {
    const accounts = await Account.find();
    res.render('admin/deposit', { accounts });
});

module.exports = router;

