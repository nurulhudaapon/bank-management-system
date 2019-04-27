const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

// All routes src
const home = require('./routes/home');
const customer = require('./routes/customer');
const account = require('./routes/account');
const deposit = require('./routes/deposit');
const addNew = require('./routes/addNew');
// Assigning routes
app.use('/', home);
app.use('/addNew', addNew);
app.use('/api/customer', customer);
app.use('/api/account', account);
app.use('/api/deposit', deposit);

mongoose.connect(config.get('database.uri'),{ useNewUrlParser: true }).then(()=> console.log('Conected to MongoDB...')).catch(()=> console.log('Could not connect to  MongDB...'));


app.listen(port, () => console.log(`Server started on port ${port} `));