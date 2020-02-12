const express = require('express');
const checkToken = require('../auth/auth'); 
const routes = express.Router();
const RegistrationController = require('../controller/RegistrationController');
const ProductController = require('../controller/ProductController');
const HomeController = require('../controller/HomeController');

routes.post('/registerMe',  RegistrationController.regMe); 
routes.post('/login',  RegistrationController.login); 
routes.post('/getProfile', checkToken, RegistrationController.getProfile); 
routes.post('/updateUserProfile', checkToken, RegistrationController.updateUserProfile);
routes.post('/updateUserImage', checkToken, RegistrationController.updateUserImage);

routes.post('/fetchProducts', checkToken, ProductController.fetchProductList);
routes.post('/addNewProduct', checkToken, ProductController.addNewProduct);
routes.post('/deleteProduct', checkToken, ProductController.deleteProduct);
routes.post('/updateProductImage', checkToken, ProductController.updateProductImage);

routes.post('/fetchAllCategory', checkToken, HomeController.fetchAllCategory);
routes.post('/fetchCategoryDetail', checkToken, HomeController.fetchCategoryDetail);
routes.post('/addNewCategory', checkToken, HomeController.addNewCategory);
routes.post('/deleteSingleCategory', checkToken, HomeController.deleteSingleCategory);

routes.post('/addNewBrand', checkToken, HomeController.addNewBrand);
routes.post('/fetchBrand', checkToken, HomeController.fetchBrand);
routes.post('/deleteBrand', checkToken, HomeController.deleteBrand);

routes.post('/addNewCountry', checkToken, HomeController.addNewCountry);
routes.post('/fetchCountry', checkToken, HomeController.fetchCountry);
routes.post('/deleteCountry', checkToken, HomeController.deleteCountry);

routes.post('/addNewCity', checkToken, HomeController.addNewCity);
routes.post('/fetchCity', checkToken, HomeController.fetchCity);
routes.post('/deleteCity', checkToken, HomeController.deleteCity);

routes.post('/addNewState', checkToken, HomeController.addNewState);
routes.post('/fetchState', checkToken, HomeController.fetchState);
routes.post('/deleteState', checkToken, HomeController.deleteState);

//Router define for App end
module.exports = routes;