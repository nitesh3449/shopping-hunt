const express = require('express');
const checkToken = require('../auth/auth'); 
const routes = express.Router();
const RegistrationController = require('../controller/RegistrationController');

routes.post('/registerMe',  RegistrationController.regMe); 
routes.post('/login',  RegistrationController.login); 
routes.post('/getProfile', checkToken, RegistrationController.getProfile); 
routes.post('/updateUserProfile', checkToken, RegistrationController.updateUserProfile);
routes.post('/updateUserImage', checkToken, RegistrationController.updateUserImage);

//Router define for App end
module.exports = routes;