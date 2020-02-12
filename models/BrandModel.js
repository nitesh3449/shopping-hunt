const mongoose = require('mongoose');

var BrandSchema = mongoose.Schema({
    brandName: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var BrandSchema = mongoose.model('brand_data', BrandSchema, 'brand_data'); 
module.exports = BrandSchema; 