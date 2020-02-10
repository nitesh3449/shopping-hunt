const mongoose = require('mongoose');

var CategoriesSchema = mongoose.Schema({
    categoryName: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var CategoriesSchema = mongoose.model('categories_data', CategoriesSchema, 'categories_data'); 
module.exports = CategoriesSchema; 