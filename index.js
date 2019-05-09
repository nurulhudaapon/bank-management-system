require('express-async-errors');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
const error = require('./middleware/error');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./startup/db')();
require ('./startup/routes')(app);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server started at: http://localhost/'));
