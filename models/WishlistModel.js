const mongoose = require('mongoose');

var WishlistSchema = mongoose.Schema({
    productId: {type: String, default:''},
    userId: {type: String, default:''},
    created_at : { type: Date, required: true, default: Date.now },
    updated_at : { type: Date, required: true, default: Date.now },
    status:{ type: String, required: true, default:"0"}
});

var WishlistSchema = mongoose.model('wishlist_data', WishlistSchema, 'wishlist_data'); 
module.exports = WishlistSchema; 