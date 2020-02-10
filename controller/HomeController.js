const CategoriesModel = require('../models/CategoriesModel');

var HomeController = {

    fetchAllCategory: async function(req, res){
        try{
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if(page < 0 || page === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await CategoriesModel.find().skip(skip).limit(limit).select('categoryName').exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'message':'Success', code:200,'count':dataInfo.length, info: dataInfo});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    fetchCategoryDetail: async function(req, res){
        try{
            var categoryId = req.body.categoryId;

            if(typeof categoryId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            await CategoriesModel.findOne({_id: categoryId}).exec(function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'message':'Success', code:200, info: dataInfo});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    addNewCategory: async function(req, res){
        try{
            var categoryName = req.body.categoryName;

            if(typeof categoryName === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }
            
            await CategoriesModel.findOne({'categoryName':categoryName}).exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});

                if(dataInfo != null){
                    res.json({'success':false, 'message':'This category is already exist', 'code': 500});
                }else{
                    var categoryInfo = new CategoriesModel({
                        categoryName: categoryName
                    });

                    await categoryInfo.save(function(err, data){
                        if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                        res.json({'success':true, 'message':'Successfully added', code:200});
                    });
                }
            });

        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    deleteSingleCategory: async function(req, res){
        try{
            var categoryId = req.body.categoryId;

            if(typeof categoryId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            await CategoriesModel.deleteOne({_id: categoryId}).exec(function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'Success':'Deleted succesfully', code:200});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },
}

module.exports = HomeController;