const mongoose = require('mongoose');

// Create schema DataexportModel
var ProductDataSchema = mongoose.Schema({
    productName: { type: String, default:""},
    productImageData: { type: String, default:""},
    wishlistStatus: { type: String, default:""},
    rating: { type: String, default:""},
    reviewNumber: { type: String, default:""},
    basePrice: { type: String, default:""},
    finalPrice: { type: String, default:""},
    categoryId: { type: String, default:""},
    discountPercent: { type: String, default:""},
    availability:{ type: String, default:""},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});  
    // compile schema to model
var ProductDataSchema = mongoose.model('product_data', ProductDataSchema, 'product_data'); 
module.exports = ProductDataSchema; 