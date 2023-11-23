const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        unique:true
    },
    // email:{
    //     type:String,
    //     required:[true,'email is required'] ,
    //     unique:true
    // },
    password:{
        type:String,
        required:[true,'password is required'],
    }
},
{ timestamps: true}
);

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;