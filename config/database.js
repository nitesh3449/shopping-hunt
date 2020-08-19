require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_PROD_DB

// mongoose.connect('mongodb://localhost:27017/shoppinghunt',{ useNewUrlParser: true})
// .then(()=>console.log('Connected successfully'))
// .catch(()=>console.log('Something went wrong'));
 
mongoose.connect('mongodb+srv://root:12345@cluster0.n0bng.mongodb.net/shoppinghunt?retryWrites=true&w=majority',{ useNewUrlParser: true})
.then(()=>console.log('Connected successfully'))
.catch(()=>console.log('Something went wrong'));

//mongodb+srv://root:<password>@cluster0.n0bng.mongodb.net/<dbname>?retryWrites=true&w=majority