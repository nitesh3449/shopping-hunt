const mongoose = require('mongoose');

var ColorSchema = mongoose.Schema({
    colorName: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var ColorSchema = mongoose.model('color_data', ColorSchema, 'color_data'); 
module.exports = ColorSchema; 