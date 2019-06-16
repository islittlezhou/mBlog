const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: String,
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isTransfer: Boolean,
    transferId: mongoose.Schema.Types.ObjectId,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'imageurl'}],
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'videourl'}],
    createDate: Date
});

// schema.index({_id:1});

module.exports = mongoose.model('contents', schema);