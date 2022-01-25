const express = require('express');
let app = express();
const _ = require('lodash');
let bodyParser = require('body-parser');
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
var https = require("https");
var fs = require( 'fs' );

// const db = require('./config/database');
const indexRouter = require('./routes/index');
// app.use(logger('tiny'));  // https://shoppinghuntapi.herokuapp.com/
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://shoppinghuntapi.herokuapp.com/"); 
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(express.json());
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(express.urlencoded({extended: false}));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(cors());

var port = process.env.PORT || 3000;
console.log('PROD');
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.use('/api',indexRouter); 
// // listen for requests
app.listen(port, () => {
    console.log("Server is listening on port "+port);
});
// var server = https.createServer({
//     // key: fs.readFileSync('/etc/ssl/app2019/private.key'),
//     // cert: fs.readFileSync('/etc/ssl/app2019/certificate.crt'),
//     // ca: fs.readFileSync('/etc/ssl/app2019/ca_bundle.crt'),
//     requestCert: false,
//     rejectUnauthorized: false
// },app);
// server.listen(port);
//}
console.log(`Listen to ${port}`);
module.exports = app;