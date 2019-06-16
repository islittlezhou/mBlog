const mongoose =require('mongoose');

const schema = mongoose.Schema({
    imageUrl: String
});

// schema.index({_id:1});

module.exports = mongoose.model('imageurl', schema);