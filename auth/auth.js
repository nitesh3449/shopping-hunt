let jwt = require('jsonwebtoken');
require('dotenv').config();
let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token){
    tokens = token.split(' ');
    token = tokens[2];    
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET_VAL, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
module.exports =  checkToken; 