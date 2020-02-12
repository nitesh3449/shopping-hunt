const CategoriesModel = require('../models/CategoriesModel');
const BrandModel = require('../models/BrandModel');
const CityModel = require('../models/CityModel');
const CountryModel = require('../models/CountryModel');
const StateModel = require('../models/StateModel');

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

    /////////////////////////Brand//////////////////
    fetchBrand: async function(req, res){
        try{
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if(page < 0 || page === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await BrandModel.find().skip(skip).limit(limit).select('brandName').exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'message':'Success', code:200,'count':dataInfo.length, info: dataInfo});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    addNewBrand: async function(req, res){
        try{
            var brandName = req.body.brandName;

            if(typeof brandName === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }
            
            await BrandModel.findOne({'brandName':brandName}).exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});

                if(dataInfo != null){
                    res.json({'success':false, 'message':'This brand name is already exist', 'code': 500});
                }else{
                    var brandInfo = new BrandModel({
                        brandName: brandName
                    });

                    await brandInfo.save(function(err, data){
                        if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                        res.json({'success':true, 'message':'Successfully added', code:200});
                    });
                }
            });

        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    deleteBrand: async function(req, res){
        try{
            var brandId = req.body.brandId;

            if(typeof brandId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            await BrandModel.deleteOne({'_id': brandId}).exec(function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'Success':'Deleted succesfully', code:200});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    /////////////////////////State//////////////////
    fetchCountry: async function(req, res){
        try{
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if(page < 0 || page === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await CountryModel.find().skip(skip).limit(limit).select('countryName').exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'message':'Success', code:200,'count':dataInfo.length, info: dataInfo});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    addNewCountry: async function(req, res){
        try{
            var countryName = req.body.countryName;
            
            if(typeof countryName === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }
            
            await CountryModel.findOne({'countryName':countryName}).exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});

                if(dataInfo != null){
                    res.json({'success':false, 'message':'This country is already exist', 'code': 500});
                }else{
                    var countryInfo = new CountryModel({
                        countryName: countryName
                    });

                    await countryInfo.save(function(err, data){
                        if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                        res.json({'success':true, 'message':'Successfully added', code:200});
                    });
                }
            });

        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    deleteCountry: async function(req, res){
        try{
            var countryId = req.body.countryId;

            if(typeof countryId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            await CountryModel.deleteOne({'_id': countryId}).exec(function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'Success':'Deleted succesfully', code:200});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    /////////////////////////State//////////////////
    fetchState: async function(req, res){
        try{
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);
            var countryId = req.body.countryId;

            if(typeof countryId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }
            
            if(page < 0 || page === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await StateModel.find({countryId : countryId}).skip(skip).limit(limit).select('stateName').exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'message':'Success', code:200,'count':dataInfo.length, info: dataInfo});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    addNewState: async function(req, res){
        try{
            var stateName = req.body.stateName;
            var countryId = req.body.countryId;

            if(typeof stateName === '' || typeof countryId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }
            
            await StateModel.findOne({'stateName':stateName}).exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});

                if(dataInfo != null){
                    res.json({'success':false, 'message':'This state is already exist', 'code': 500});
                }else{
                    await CountryModel.find({'_id':countryId}).exec(async function(err, data){
                        if(err) res.json({'success':false, 'message':'Something went wrong '+err, 'code': 500});
                        if(data.length>0){
                            var stateInfo = new StateModel({
                                stateName: stateName,
                                countryId: countryId,
                            });
        
                            await stateInfo.save(function(err, data){
                                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                                res.json({'success':true, 'message':'Successfully added', code:200});
                            });
                        } else{
                            res.json({'success':false, 'message':'Please enter valid country', 'code': 500});
                        }
                    });
                }
            });

        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    deleteState: async function(req, res){
        try{
            var stateId = req.body.stateId;

            if(typeof stateId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            await StateModel.deleteOne({'_id': stateId}).exec(function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'Success':'Deleted succesfully', code:200});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    /////////////////////////City//////////////////
    fetchCity: async function(req, res){
        try{
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit); 
            var countryId = req.body.countryId;
            var stateId = req.body.stateId;

            if(typeof countryId === '' || typeof stateId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            if(page < 0 || page === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await CityModel.find({countryId:countryId, stateId: stateId}).skip(skip).limit(limit).select('cityName').exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'message':'Success', code:200,'count':dataInfo.length, info: dataInfo});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    addNewCity: async function(req, res){
        try{
            var cityName = req.body.cityName;
            var countryId = req.body.countryId;
            var stateId = req.body.stateId;

            if(typeof cityName === '' || typeof stateId === '' || typeof countryId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }
            
            await CityModel.findOne({'cityName':cityName}).exec(async function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});

                if(dataInfo != null){
                    res.json({'success':false, 'message':'This city is already exist', 'code': 500});
                }else{
                    await CountryModel.find({'_id':countryId}).exec(async function(err, data){
                        if(data.length>0){
                            await StateModel.find({_id : stateId, countryId: countryId}).exec(async function(err,data){
                               if(data.length>0){
                                    var cityInfo = new CityModel({
                                        cityName: cityName,
                                        countryId: countryId,
                                        stateId: stateId
                                    });
                
                                    await cityInfo.save(function(err, data){
                                        if(err) res.json({'success':false, 'message':'Something went wrong ', 'code': 500});
                                        res.json({'success':true, 'message':'Successfully added', code:200});
                                    });
                               } else {
                                res.json({'success':false, 'message':'Please enter valid state', 'code': 500});
                               }     
                            });
                        } else {
                            res.json({'success':false, 'message':'Please enter valid country', 'code': 500});
                        }
                    });
                }
            });

        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    deleteCity: async function(req, res){
        try{
            var cityId = req.body.cityId;

            if(typeof cityId === ''){
                return res.json({'success':false, 'message':'Please provide required fields', code:500}); 
            }

            await CityModel.deleteOne({'_id': cityId}).exec(function(err, dataInfo){
                if(err) res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});

                res.json({'success':true, 'Success':'Deleted succesfully', code:200});
            });
        }catch(e){
            res.json({'success':false, 'message':'Something went wrong '+e, 'code': 500});
        }
    },

    
}

module.exports = HomeController;