const productModel = require('../models/productModel');

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

            await productModel.find({},{},query).exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                
                // console.log(dataInfo);
                if(dataInfo.length > 0){
                    res.json({'success':true, 'message':'Success', code:200,'count':dataInfo.length, info: dataInfo});
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
        
            if(typeof productName === '' || typeof basePrice === '' || typeof finalPrice === '' || typeof discountPercent === ''){
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
                        availability: availability
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
}

module.exports = ProductController;