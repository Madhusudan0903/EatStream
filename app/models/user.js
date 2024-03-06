const mongoose = require('mongoose')
const Schema = mongoose. Schema
const userSchema = new Schema({
    name: { type:String, required: true },
    email: { type:String, required: true, unique:true },
    password: { type:String, required: true } ,
    size: { type:String, default:'customer' }
},{timestamps: true}) //isse time aajayega


module.exports = mongoose.model('User', userSchema)