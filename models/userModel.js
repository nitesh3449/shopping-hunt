const mongoose = require('mongoose');
// Create schema DataexportModel
var UserSchema = mongoose.Schema({
  first_name: { type: String, default:""},
  last_name: { type: String, default:""},
  user_image: { type: String, default:""},
  mobile_number: { type: String, default:""},
  device_token: { type: String, default:""},
  degination: { type: String, default:""},
  email: { type: String, default:""},
  password: { type: String, default:""},
  auth_token:{ type: String, default:""},
  created_at : { type: Date, required: true, default: Date.now },
  updated_at : { type: Date, required: true, default: Date.now },
  status:{ type: String, required: true, default:"0"}
  });  
  // compile schema to model
  var UserSchema = mongoose.model('users', UserSchema, 'users'); 
module.exports = UserSchema; 