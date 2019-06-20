
const mongoose =require('mongoose');

const schema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    attentionUserId: mongoose.Schema.Types.ObjectId,
    isAttention: Number
});

module.exports = mongoose.model('attentions', schema);