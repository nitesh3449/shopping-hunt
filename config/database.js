require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_PROD_DB

mongoose.connect('mongodb://localhost:27017/shoppinghunt',{ useNewUrlParser: true})
.then(()=>console.log('Connected successfully'))
.catch(()=>console.log('Something went wrong'));
