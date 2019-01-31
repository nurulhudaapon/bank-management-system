const express = require('express');
const mongoose = require('mongoose');
const app = express();
const logger = require('./logger');
const Joi = require('joi');
app.use(express.json());
        // const schema = {
        //     name: Joi.string().min(3).required(),
        //     phone: Joi.number().min(11).required(),
        //     address: Joi.string().required()
        // };
        // const result = Joi.validate(req.query, schema);
        // if(result.error) return res.status(400).send(result.error.details[0].message);


    app.get('/api/users', (req, res) => {

            
        
        let user = {
            name: req.query.name,
            phone: req.query.phone,
            address: req.query.address
        };

        mongoose.connect('mongodb://localhost/coustomers')
    .then(() => console.log('connected to db'));

const createCoustomer = async () => {
    const coustomerSchema = new mongoose.Schema({name: String,phone: String,address: String,acc_date: {type: Date, default: Date.now}});

    let Coustomer = mongoose.model('Coustomer', coustomerSchema);
    let coustomer = new Coustomer(
    //{name: 'test',phone: 'String',address: 'String'}
    user);
    const result1 = await coustomer.save();
    console.log(result1);
};
createCoustomer();

        console.log('New entry!')
        res.send(user);
    });




    const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port} `));