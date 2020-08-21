const userModel = require('../models/userModel'); 
let jwt = require('jsonwebtoken');

var RegistrationController = {
    ///////////Register/////////////
    regMe: async function(req, res){
        try{
            var firstname = req.body.firstname; 
            var lastname = req.body.lastname; 
            var mobileNumber = req.body.mobileNumber; 
            var email = req.body.email;
            var password = req.body.password;

            if(typeof firstname === '' || typeof lastname === '' || typeof mobileNumber === '' || typeof email === '' || typeof password === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            } 
            const authtoken = jwt.sign({ usernumber:mobileNumber }, process.env.JWT_SECRET_VAL);

            // await userModel.find({mobileNumber:mobileNumber, email:email}, function(err, datainfo){
            //     if(err){
            //         res.status(501).json(err);
            //         return;    
            //     }

            //     return res.json({'success':false, 'message': 'You are already a member please login', status: 200, info: authtoken});
            // });
            await userModel.find({mobile_number:mobileNumber, email:email}).exec(function(err, data){
                if(err){
                    res.status(501).json(err);
                    return;    
                }
                console.log(data.length);
                if(data.length > 0){
                    return res.json({'success':false, 'message': 'You are already a member please login', status: 200, info: data[0]});
                } else{
                    //Entery data to database start
                    var userInfo = new userModel({
                        first_name: firstname,
                        last_name: lastname,
                        mobile_number: mobileNumber,
                        email: email,
                        auth_token: authtoken
                    });
					
					userInfo.password = userInfo.generateHash(password);
                    userInfo.save(function(err, dataInfo){
                        if(err){
                            res.json({'success':false, 'message': 'something went wrong', code : 500});                
                        } 
                        userModel.find({auth_token:authtoken}).exec(function (err, info) {
                            if(err) { res.status(500).json(err); return; };           
                            if(info.length>=1){
                                var returnArray = info[0];
                            }else{
                                var returnArray = {};
                            }          
                            res.json({'success':true, 'message':'Success', code:200,  info:returnArray});
                        }); 
                        
                    })
                }
            });
        }catch(e){
            res.json({'success':false, 'message': 'something went wrong '+e, code : 500});
        }
    },

    ///////////Login///////////////
    login: async function(req, res){
        try{
            var mobileNumber = req.body.mobile_number; 
            var password     = req.body.password;
            console.log("hello");
    
            if(typeof mobileNumber === ''|| typeof password === ''){
                return res.json({'success':false, 'message':'Please provide required field', code:500}); 
            } 
    
            const authtoken = jwt.sign({ usernumber:mobileNumber }, process.env.JWT_SECRET_VAL);
            const filter = { mobile_number:mobileNumber, email:mobileNumber, password: password};
            const update = { auth_token: authtoken };

            await userModel.updateOne(filter, update, (err, chk)=>{
                userModel.findOne({ $or:[{email:mobileNumber},{mobile_number:mobileNumber} ]}).exec(async function(err, info){
                    if(err) { res.status(500).json(err); return; }; 
                    if(info!=null){
						// test a matching password
						if (info.validPassword(password)) {
							res.json({'success':true, 'message':'Success', code:200,  info:info});
						} else {
						  // password matched. proceed forward
						  res.json({'success':false, 'message':'Credentials not found please recheck', code:200,  info:{}});
						}
					
                    } else{
                        res.json({'success':false, 'message':'Number not found please recheck', code:200,  info:{}});
                    }  
                });
            });
        } catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, code:500});
        }
    },

    ///////////Get Profile Detail////////
    getProfile: async function(req, res){
        try{
            var user_id = req.query.user_id;
            if( typeof(user_id) === 'undefined' ){
                res.json({'success':false, 'message':'Please provide user id', code:500});    
            }

            await userModel.findOne({_id: user_id}).exec(async function(err, data){
                if(data!=null){
                    res.json({'success':true, 'message':'Success', code:200, info: data});
                }else{
                    res.json({'success':false, 'message':'No Such data found', code:200, info: {}});
                }
            });

            // var user_details = await userModel.findOne({_id: user_id}).exec();

            // user_details = JSON.parse( JSON.stringify(user_details) );
            // res.json({'success':true, 'message':'Success', code:200, info: user_details});
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong', code:500});    
        }
    },
    
    //////////////Update User Profile////////////////////
    updateUserProfile: async function(req, res){
        try{
            var user_id = req.body.user_id; 
            var firstname = req.body.firstname; 
            var lastname = req.body.lastname; 
            var mobileNumber = req.body.mobileNumber; 
            var email = req.body.email;

            if(typeof user_id === '' || typeof firstname === '' || typeof lastname === '' || typeof mobileNumber === '' || typeof email === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            } 
            const authtoken = jwt.sign({ usernumber:mobileNumber }, process.env.JWT_SECRET_VAL);

             // Get user details by id
             await userModel.findOne({ _id: user_id }).exec(async function(err, user_details){
                if(err) { res.status(500).json(err); return; }; 
                if(user_details!=null){

                    updateValues = {
                        first_name: firstname ? firstname : user_details.first_name,
                        last_name: lastname ? lastname : user_details.last_name,
                        mobile_number: mobileNumber ? mobileNumber : user_details.mobile_number,
                        email: email ? email : user_details.email,
                        auth_token: authtoken ? authtoken : user_details.auth_token,
                    }

                    // Update user profile
                    userModel.updateOne({ _id: user_id }, updateValues, async function (error, result) {
                        if (error) { res.status(500).json(error); return; };
                        // Get user details by id
                        var user_details = await userModel.findOne({ _id: user_id }).exec();
                        res.json({ 'success': true, 'message': 'User profile updated successfully', code: 200, user: user_details });
                    });

                    res.json({'success':true, 'message':'Success', code:200, info: data});
                }else{
                    res.json({'success':false, 'message':'No Such data found', code:200, info: {}});
                }
             });

        }catch(e){
            res.json({'success':false, 'message':'Something went wrong', code:500});    
        }
    },

    //////////Update User Image///////////
    updateUserImage: async function(req, res){
        try{
            var user_id = req.body.user_id;
            let profileImage =   req.files.profileImage;

            if(typeof user_id === 'undefined' || typeof profileImage === 'undefined'){
                return res.json({'message':'Please provide required fields', code:500}); 
            }
            // let userImagePath = ''; 
            let currentDate = Date.now();
            let filename = profileImage.name;
            let filenameorg = filename.replace(/ /g,"_");  
            var baseURL = process.env.BASE_URL;
            userImagePath =  baseURL+'public/profile/'+currentDate+'_'+filenameorg;   
            await profileImage.mv(`./public/profile/${currentDate}_${filenameorg}`); 
          
            var findUser = {_id: user_id};
            var updateValue = {               
                user_image:userImagePath                 
            };
            console.log(userImagePath);
            await userModel.updateOne(findUser, updateValue, async function (err, datainfo) { 
                var user_details = await userModel.findOne({ _id: user_id }).exec();
                res.json({ 'success': true, 'message': 'User image updated successfully', code: 200, user: user_details });
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, code:500});    
        }
    },

}

module.exports = RegistrationController;