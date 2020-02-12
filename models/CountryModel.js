const mongoose = require('mongoose');

var CountrySchema = mongoose.Schema({
    countryName: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var CountrySchema = mongoose.model('country_data', CountrySchema, 'country_data'); 
module.exports = CountrySchema; 