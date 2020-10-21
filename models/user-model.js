'user strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {ObjectID} = mongoose.Schema;

const userModel = new schema({
    nome:{trim:true,index:true,required:true,type:String},
    email:{type:String},
    senha:{type:String},
    ativo:{type:Boolean,default:Date.now}
},{versionKey:false});

userModel.pre("save", next => {
    let agora = new Date();
    if(!this.createAt) this.createAt = agora;
    next();
});

module.exports = mongoose.model("User", userModel);