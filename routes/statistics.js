const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');

const _ = require('lodash');
router.use(express.json());

const { Account } = require('../models/account');
const { Customer } = require('../models/customer');
const { Deposit } = require('../models/deposit');

router.get('/', admin, async (req, res) => {
    let count = {};
    // let total = {};
    let accounts = await Account.find();
    let customers = await Customer.find();
    let deposits = await Deposit.find();

    let sumAccount = await Account
        .aggregate([
            { $match: { $and: [{ withdrawn: false }] } },
            { $group: { _id: null, sumAccount: { $sum: "$current" } } }

        ]);

    count.customer = customers.length;
    count.accountCount = accounts.length;
    count.runningAccountCount = _.filter(accounts, function (o) { if (o.withdrawn == false) return o }).length;
    count.depositCount = deposits.length;
    count.deposits = deposits;

    let total = function () {
        if (sumAccount[0]) return sumAccount[0].sumAccount;
        return 0;
    }
    // console.log(total());
    

    count.total = total();

    res.json(count);
});



module.exports = router;

