const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());





let users = [
    {id:1, name:'Apon', email: 'test@g.com'}
    ];

    app.post('/api/users', (req, res) => {
        const schema = {
            name: Joi.string().min(3).required(),
            email: Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body, schema);
        console.log(result)
    
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };
        let user = {
            id: users.length+1,
            name: req.query.name,
            email: req.query.email
        };
        users.push(user);
        console.log('New entry!')
        res.send(users);
    });

    const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port} `));