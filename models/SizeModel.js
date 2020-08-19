const mongoose = require('mongoose');

var SizeSchema = mongoose.Schema({
    sizeName: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var SizeSchema = mongoose.model('size_data', SizeSchema, 'size_data'); 
module.exports = SizeSchema; 