const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
app.use(express.static('public'));

mongoose.connect('mongodb://bank-ponsrik:338899a@ds145359.mlab.com:45359/coustomer_list',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));
// mongoose.connect('mongodb://localhost/bank-ponsrik',{ useNewUrlParser: true }).then(()=> console.log('Conected to DB...'));

    const coustomerSchema = new mongoose.Schema({name: String,phone: String,address: String,acc_date: {type: Date, default: Date.now}});
    let Coustomer = mongoose.model('Coustomers', coustomerSchema);
    const coustomerInfo = {name: 'Nurul Huda Apon',phone: '015454',address: 'rayerbag'};



const createCoustomer = async (coustomerInfo) => {
    let coustomer = new Coustomer(coustomerInfo);
    const result = await coustomer.save();
    // console.log(`New User${}`);
    getUserNumber();
};




const getUser = async () => {
   const result = await Coustomer.findOne().select({name: 1, acc_date:1});
   console.log(result);
};
const getUserNumber = async () => {
   const result = await Coustomer.findOne().countDocuments();
   console.log(result);
};



app.get('/api/users', (req, res) => {
    console.log('Request recieved..');
    let user = {name: req.query.name,phone: req.query.phone,address: req.query.address}
    
    createCoustomer(user);
    res.send(user);
    // getUser();
    }
);
    

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port} `));