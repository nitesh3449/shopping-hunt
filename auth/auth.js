let jwt = require('jsonwebtoken');
require('dotenv').config();
let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
 
  if (token){
    tokens = token.split(' ');
    if(req.get('host') == '10.0.2.2:3000'){
      token = tokens[1];    
    } else {
      token = tokens[2];    
    }
    
    jwt.verify(token, process.env.JWT_SECRET_VAL || "Nitesh", (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid '+err
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