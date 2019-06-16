const mongoose =require('mongoose');

const schema = mongoose.Schema({
    videoUrl: String,
});

schema.index({_id:1});

module.exports = mongoose.model('videourls', schema);