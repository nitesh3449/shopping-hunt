const mongoose = require('mongoose');

// Create schema DataexportModel
var ProductImageSchema = mongoose.Schema({
    productId: { type: String, default:""},
    productImageData: { type: String, default:""},
    productImagePath: { type: String, default:""},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});  
    // compile schema to model
var ProductImageSchema = mongoose.model('product_images', ProductImageSchema, 'product_images'); 
module.exports = ProductImageSchema; 