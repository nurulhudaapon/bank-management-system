// All routes src
const home = require('../routes/home');
const customer = require('../routes/customer');
const account = require('../routes/account');
const deposit = require('../routes/deposit');
const addNew = require('../routes/addNew');
const statistics = require('../routes/statistics');

module.exports = function (app) {
    // Assigning routes
    app.use('/', home);
    app.use('/addNew', addNew);
    app.use('/api/customer', customer);
    app.use('/api/account', account);
    app.use('/api/deposit', deposit);
    app.use('/api/statistics', statistics);
}