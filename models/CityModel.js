const mongoose = require('mongoose');

var CitySchema = mongoose.Schema({
    cityName: {type: String, default:''},
    countryId: {type: String, default:''},
    stateId: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var CitySchema = mongoose.model('city_data', CitySchema, 'city_data'); 
module.exports = CitySchema; 