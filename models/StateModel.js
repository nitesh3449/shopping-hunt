const mongoose = require('mongoose');

var StateSchema = mongoose.Schema({
    stateName: {type: String, default:''},
    countryId: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var StateSchema = mongoose.model('state_data', StateSchema, 'state_data'); 
module.exports = StateSchema; 