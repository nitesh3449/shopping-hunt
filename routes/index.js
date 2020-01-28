const express = require('express');
const checkToken = require('../auth/auth'); 
const routes = express.Router();
const RegistrationController = require('../controller/RegistrationController');
const ProductController = require('../controller/ProductController');

routes.post('/registerMe',  RegistrationController.regMe); 
routes.post('/login',  RegistrationController.login); 
routes.post('/getProfile', checkToken, RegistrationController.getProfile); 
routes.post('/updateUserProfile', checkToken, RegistrationController.updateUserProfile);
routes.post('/updateUserImage', checkToken, RegistrationController.updateUserImage);

routes.post('/fetchProducts', checkToken, ProductController.fetchProductList);
routes.post('/addNewProduct', checkToken, ProductController.addNewProduct);
//Router define for App end
module.exports = routes;