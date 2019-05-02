require('express-async-errors');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
const error = require('./middleware/error');

require('./startup/db')();
require ('./startup/routes')(app);

app.use(error);

const port = process.env.PORT || 80;
const host = '127.0.0.2'
app.listen(port, host, () => console.log('Server started at: http://'+host+'/'));