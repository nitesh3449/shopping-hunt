const CategoriesModel = require('../models/CategoriesModel');
const BrandModel = require('../models/BrandModel');
const CityModel = require('../models/CityModel');
const CountryModel = require('../models/CountryModel');
const StateModel = require('../models/StateModel');
const ColorModel = require('../models/ColorModel');
const SizeModel = require('../models/SizeModel');
const ProductModel = require('../models/productModel');
const WishlistModel = require('../models/WishlistModel');
const productImageModel = require('../models/productImageModel');

var HomeController = {

    fetchAllCategory: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await CategoriesModel.find().skip(skip).limit(limit).select('categoryName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    fetchCategoryDetail: async function (req, res) {
        try {
            var categoryId = req.body.categoryId;

            if (typeof categoryId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CategoriesModel.findOne({ _id: categoryId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewCategory: async function (req, res) {
        try {
            var categoryName = req.body.categoryName;

            if (typeof categoryName === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CategoriesModel.findOne({ 'categoryName': categoryName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This category is already exist', 'code': 500 });
                } else {
                    var categoryInfo = new CategoriesModel({
                        categoryName: categoryName
                    });

                    await categoryInfo.save(function (err, data) {
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                        res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteSingleCategory: async function (req, res) {
        try {
            var categoryId = req.body.categoryId;

            if (typeof categoryId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CategoriesModel.deleteOne({ _id: categoryId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////Brand//////////////////
    fetchBrand: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await BrandModel.find().skip(skip).limit(limit).select('brandName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewBrand: async function (req, res) {
        try {
            var brandName = req.body.brandName;

            if (typeof brandName === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await BrandModel.findOne({ 'brandName': brandName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This brand name is already exist', 'code': 500 });
                } else {
                    var brandInfo = new BrandModel({
                        brandName: brandName
                    });

                    await brandInfo.save(function (err, data) {
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                        res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteBrand: async function (req, res) {
        try {
            var brandId = req.body.brandId;

            if (typeof brandId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await BrandModel.deleteOne({ '_id': brandId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////State//////////////////
    fetchCountry: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await CountryModel.find().skip(skip).limit(limit).select('countryName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewCountry: async function (req, res) {
        try {
            var countryName = req.body.countryName;

            if (typeof countryName === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CountryModel.findOne({ 'countryName': countryName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This country is already exist', 'code': 500 });
                } else {
                    var countryInfo = new CountryModel({
                        countryName: countryName
                    });

                    await countryInfo.save(function (err, data) {
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                        res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteCountry: async function (req, res) {
        try {
            var countryId = req.body.countryId;

            if (typeof countryId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CountryModel.deleteOne({ '_id': countryId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////State//////////////////
    fetchState: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);
            var countryId = req.body.countryId;

            if (typeof countryId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await StateModel.find({ countryId: countryId }).skip(skip).limit(limit).select('stateName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewState: async function (req, res) {
        try {
            var stateName = req.body.stateName;
            var countryId = req.body.countryId;

            if (typeof stateName === '' || typeof countryId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await StateModel.findOne({ 'stateName': stateName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This state is already exist', 'code': 500 });
                } else {
                    await CountryModel.find({ '_id': countryId }).exec(async function (err, data) {
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + err, 'code': 500 });
                        if (data.length > 0) {
                            var stateInfo = new StateModel({
                                stateName: stateName,
                                countryId: countryId,
                            });

                            await stateInfo.save(function (err, data) {
                                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                                res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                            });
                        } else {
                            res.json({ 'success': false, 'message': 'Please enter valid country', 'code': 500 });
                        }
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteState: async function (req, res) {
        try {
            var stateId = req.body.stateId;

            if (typeof stateId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await StateModel.deleteOne({ '_id': stateId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////City//////////////////
    fetchCity: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);
            var countryId = req.body.countryId;
            var stateId = req.body.stateId;

            if (typeof countryId === '' || typeof stateId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await CityModel.find({ countryId: countryId, stateId: stateId }).skip(skip).limit(limit).select('cityName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewCity: async function (req, res) {
        try {
            var cityName = req.body.cityName;
            var countryId = req.body.countryId;
            var stateId = req.body.stateId;

            if (typeof cityName === '' || typeof stateId === '' || typeof countryId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CityModel.findOne({ 'cityName': cityName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This city is already exist', 'code': 500 });
                } else {
                    await CountryModel.find({ '_id': countryId }).exec(async function (err, data) {
                        if (data.length > 0) {
                            await StateModel.find({ _id: stateId, countryId: countryId }).exec(async function (err, data) {
                                if (data.length > 0) {
                                    var cityInfo = new CityModel({
                                        cityName: cityName,
                                        countryId: countryId,
                                        stateId: stateId
                                    });

                                    await cityInfo.save(function (err, data) {
                                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                                        res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                                    });
                                } else {
                                    res.json({ 'success': false, 'message': 'Please enter valid state', 'code': 500 });
                                }
                            });
                        } else {
                            res.json({ 'success': false, 'message': 'Please enter valid country', 'code': 500 });
                        }
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteCity: async function (req, res) {
        try {
            var cityId = req.body.cityId;

            if (typeof cityId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await CityModel.deleteOne({ '_id': cityId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////Color//////////////////
    fetchColor: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await ColorModel.find().skip(skip).limit(limit).select('colorName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewColor: async function (req, res) {
        try {
            var colorName = req.body.colorName;

            if (typeof colorName === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await ColorModel.findOne({ 'colorName': colorName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This color is already exist', 'code': 500 });
                } else {
                    var colorInfo = new ColorModel({
                        colorName: colorName,
                    });

                    await colorInfo.save(function (err, data) {
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                        res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteColor: async function (req, res) {
        try {
            var colorId = req.body.colorId;

            if (typeof colorId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await ColorModel.deleteOne({ '_id': colorId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////Size//////////////////
    fetchSize: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await SizeModel.find().skip(skip).limit(limit).select('sizeName').exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': dataInfo.length, info: dataInfo });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addNewSize: async function (req, res) {
        try {
            var sizeName = req.body.sizeName;

            if (typeof sizeName === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await SizeModel.findOne({ 'sizeName': sizeName }).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                if (dataInfo != null) {
                    res.json({ 'success': false, 'message': 'This size name is already exist', 'code': 500 });
                } else {
                    var sizeInfo = new SizeModel({
                        sizeName: sizeName
                    });

                    await sizeInfo.save(function (err, data) {
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });
                        res.json({ 'success': true, 'message': 'Successfully added', code: 200 });
                    });
                }
            });

        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    deleteSize: async function (req, res) {
        try {
            var sizeId = req.body.sizeId;

            if (typeof sizeId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            await SizeModel.deleteOne({ '_id': sizeId }).exec(function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });

                res.json({ 'success': true, 'Success': 'Deleted succesfully', code: 200 });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    /////////////////////////Wishlist//////////////////
    fetchWishlist: async function (req, res) {
        try {
            var page = parseInt(req.body.page);
            var limit = parseInt(req.body.limit);

            if (page < 0 || page === 0) {
                response = { "error": true, "message": "invalid page number, should start with 1" };
                return res.json(response)
            }
            var skip = limit * (page - 1);

            await ProductModel.find({ 'wishlistStatus': "1"}).skip(skip).limit(limit).exec(async function (err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
                console.log(dataInfo);
                var newArr = [];
                if(dataInfo.length > 0) {
                    for(let data of dataInfo){
                        // element = JSON.parse(JSON.stringify(element));
                        // var productData = await ProductModel.findOne({_id: element['productId']}).exec();
                        data = JSON.parse(JSON.stringify(data));
                            data.productImageData = [];
                            data.categoryData = {};
                            var image = await productImageModel.find({'productId': data['_id']}).select('productId productImageData').exec();
                            data.productImageData = image;
                        
                            var categoryInfo = await CategoriesModel.findOne({'_id':data['categoryId']}).select('categoryName').exec();
                            data.categoryData = categoryInfo;

                            // console.log(data);
                            newArr.push(data);
                    }
                }
            
                res.json({ 'success': true, 'message': 'Success', code: 200, 'count': newArr.length, info: newArr });
            });
        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },

    addRemoveWishlist: async function (req, res) {
        try {
            var productId = req.body.productId;
            // var userId = req.body.userId;

            if (typeof productId === '') {
                return res.json({ 'success': false, 'message': 'Please provide required fields', code: 500 });
            }

            // await ProductModel.find({ 'wishlistStatus': "1"}).skip(skip).limit(limit).exec(async function (err, dataInfo) {
           
            // },

            await ProductModel.findOne({"_id": productId}).exec(async function(err, dataInfo) {
                if (err) res.json({ 'success': false, 'message': 'Something went wrong ', 'code': 500 });

                console.log(dataInfo);
                if(dataInfo != null) {
                    var wishlistStatus = dataInfo['wishlistStatus'] == "1" ? "0" : "1";
                    var wishlistStatusMessage = dataInfo['wishlistStatus'] == "1" ? "Succesfully removed" : "Succesfully added";
                    await ProductModel.updateOne({_id:productId},{wishlistStatus: wishlistStatus}).exec(function(err, data){
                        if (err) res.json({ 'success': false, 'message': 'Something went wrong ' + err, 'code': 500 });

                        res.json({ 'success': true, 'Success': wishlistStatusMessage, code: 200 }); 
                    });
                } else {
                    res.json({ 'success': true, 'Success': "Not added", code: 500 }); 
                }
            });


        } catch (e) {
            res.json({ 'success': false, 'message': 'Something went wrong ' + e, 'code': 500 });
        }
    },
}

module.exports = HomeController;