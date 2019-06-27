const mongoose =require('mongoose');

const schema = mongoose.Schema({
    account: String,
    password: String,
    realName: String,
    nickName: String,
    bothDay: Date,
    qq: String,
    phone: String,
    email: String,
    Address: String,
    company: String,
    blood: String,
    emotionStatus: String,
    sexHobby: String,
    location: String,
    avatorImg:[String]
    // attention: [{type: mongoose.Schema.Types.ObjectId, refs: 'users'}]
});

// schema.index({_id:1});

module.exports = mongoose.model('users', schema);