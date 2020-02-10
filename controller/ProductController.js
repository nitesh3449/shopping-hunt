const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const CategoriesModel = require('../models/CategoriesModel');
const fs = require( 'fs' );

var ProductController = {
    ////////fetchProductList///////
    fetchProductList: async function(req, res){
        try{
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if(page < 0 || page === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
            }
            var query = {}
            query.skip = limit * (page - 1)
            query.limit = limit

            await productModel.find().skip(limit*(page-1)).limit(limit).select('-created_at -updated_at -__v').exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                
                var newArr = [];
                // console.log(dataInfo);
                if(dataInfo.length > 0){
                    
                    for(let data of dataInfo){
                        data = JSON.parse(JSON.stringify(data));
                        data.productImageData = [];
                        data.categoryData = {};
                        var image = await productImageModel.find({'productId': data['_id']}).select('productId productImageData').exec();
                        data.productImageData = image;
                       
                        var categoryInfo = await CategoriesModel.findOne({'_id':data['categoryId']}).select('categoryName').exec();
                        data.categoryData = categoryInfo;

                        // console.log(data);
                        newArr.push(data);
                        // res.json({'success':true, 'message':'Success', code:200,'infoDetail':data.productImageData});
                    }

                    res.json({'success':true, 'message':'Success', code:200,'count':newArr.length, info: newArr});
                }else{
                    res.json({'success':false, 'message':'No record found', code:200, info: []});
                }
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    /////////////Add NewProduct/////////////////
    addNewProduct: async function(req, res){
        try{
            var productName = req.body.product_name;
            var wishlistStatus = req.body.wishlist_status;
            var rating = req.body.rating;
            var reviewNumber = req.body.review_number;
            var basePrice = req.body.base_price;
            var finalPrice = req.body.final_price;
            var discountPercent = req.body.discount_percent;
            var availability = req.body.availability;
            var categoryId = req.body.categoryId;
        
            if(typeof productName === '' || typeof basePrice === '' || typeof finalPrice === '' || typeof categoryId === '' || typeof discountPercent === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            } 

            await productModel.findOne({productName:productName}).exec(async function(err, data){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});

                if(data != null){
                    res.json({'success':false, 'message':'This product already exist', 'code': 500});
                }else{
                
                    //Entery data to database start
                    var productInfo = new productModel({
                        productName: productName,
                        wishlistStatus: wishlistStatus,
                        rating: rating,
                        reviewNumber: reviewNumber,
                        basePrice: basePrice,
                        finalPrice: finalPrice,
                        discountPercent: discountPercent,
                        availability: availability,
                        categoryId: categoryId,
                    });

                    productInfo.save(function(err, data){
                        if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                        res.json({'success':true, 'message':'Successfully added', code:200});
                    });
                }
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    ////////////Delete product/////////////////
    deleteProduct: async function(req, res){
        try{
            var productId = req.body.productId;
            if(typeof productId === ''){
                return res.json({'success':false, 'message':'Please provide required field', code:500}); 
            } 
            await productImageModel.find({productId:productId}).exec(async function(err,data){
                if(err) res.json({'success':false, 'message':'Something went wrong', 'code': 500});

                console.log(data);

                for(let element of data){
                    element = JSON.parse(JSON.stringify(element));
                    console.log(element['productImagePath']);
                    fs.unlink(element['productImagePath'], function(err) {
                        if(err && err.code == 'ENOENT') {
                            // file doens't exist
                            console.info("File doesn't exist, won't remove it. "+err);
                        } else if (err) {
                            // other errors, e.g. maybe we don't have enough permission
                            console.error("Error occurred while trying to remove file");
                        } else {
                            console.info(`removed`);
                        }
                    });    
                }

                
                await productImageModel.deleteMany({productId:productId}).exec(async function(err, data){
                    if(err) res.json({'success':false, 'message':'Something went wrong', 'code': 500});
                    
                    await productModel.deleteOne({_id:productId}, (err, data)=>{
                        if(err) res.json({'success':false, 'message':'Something went wrong', 'code': 500});
        

                        res.json({'success':true, 'message':'Item deleted successfully', 'code': 200});
                    });
                });
            });
            
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    //////////Update User Image///////////
    updateProductImage: async function(req, res){
        try{
            var productId = req.body.productId;
            let productImageList =   req.files.productImage;
			
			//res.json({'images':});

            if(typeof productId === 'undefined' || typeof productImageList === 'undefined'){
                return res.json({'message':'Please provide required fields', code:500}); 
            }

			
				//productModel.findOne({_id : productId},{productImagePath:1}, async (err, data)=>{
				productModel.findOne({_id : productId}, async (err, data)=>{
					if(err) res.json({'success':false, 'message':'Something went wrong', 'code': 500});

					/*if(data['productImagePath']!=''){
						fs.unlink(data['productImagePath'], function(err) {
							if(err && err.code == 'ENOENT') {
								// file doens't exist
								console.info("File doesn't exist, won't remove it. "+err);
							} else if (err) {
								// other errors, e.g. maybe we don't have enough permission
								console.error("Error occurred while trying to remove file");
							} else {
								console.info(`removed`);
							}
						}); 
                    }*/
                    
					var productImageInfo = null;
					var productImagePath = '';
					var productImageLink = '';
					for(let productImage of productImageList){
						productImageInfo = null;
						// let userImagePath = ''; 
						let currentDate = Date.now();
						let filename = productImage.name;
						let filenameorg = filename.replace(/ /g,"_");  
						var baseURL = process.env.BASE_URL;
						productImageLink =  baseURL+'public/product/'+currentDate+'_'+filenameorg; 
						productImagePath =  'public/product/'+currentDate+'_'+filenameorg; 
				
						await productImage.mv(`./public/product/${currentDate}_${filenameorg}`); 
						
						 //Entery data to database start
						productImageInfo = new productImageModel({
							productId: productId,
							productImageData: productImageLink,
							productImagePath: productImagePath
						});

						productImageInfo.save(function(err, data){
							if(err) res.json({'success':false, 'message':'Something went wrong '+err, 'code': 5010});
							//res.json({'success':true, 'message':'Successfully added', code:200});
						});
                    }
                    res.json({ 'success': true, 'message': 'Product image updated successfully', code: 200, user: productDetails });
					// var findProduct = {_id: productId};
					// var updateValue = {               
					// 	productImage : productImageLink,               
					// // };
					// await productModel.updateOne(findProduct, updateValue, async function (err, datainfo) { 
					// 	var productDetails = await productModel.findOne({ _id: productId }).exec();
					// 	res.json({ 'success': true, 'message': 'Product image updated successfully', code: 200, user: productDetails });
					// });
					
				});
			//return res.json({'message':'Please provide required fields', code:500}); 
        
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, code:5001});    
        }
    },
}

module.exports = ProductController;