const express = require('express');
const checkToken = require('../auth/auth'); 
const routes = express.Router();
const HomeController = require('../controller/HomeController');
const ProductController = require('../controller/ProductController');
// const RegistrationController = require('../controller/RegistrationController');

routes.post('/registerMe',  RegistrationController.regMe); 
routes.post('/login',  RegistrationController.login); 
routes.get('/getProfile', checkToken, RegistrationController.getProfile); 
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

routes.post('/fetchColor', checkToken, HomeController.fetchColor);
routes.post('/addNewColor', checkToken, HomeController.addNewColor);
routes.post('/deleteColor', checkToken, HomeController.deleteColor);

routes.post('/fetchSize', checkToken, HomeController.fetchSize);
routes.post('/addNewSize', checkToken, HomeController.addNewSize);
routes.post('/deleteSize', checkToken, HomeController.deleteSize);

routes.post('/fetchWishlist', checkToken, HomeController.fetchWishlist);
routes.post('/addRemoveWishlist', checkToken, HomeController.addRemoveWishlist);

//Router define for App end
module.exports = routes;