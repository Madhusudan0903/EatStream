const mongoose = require('mongoose')
const Schema = mongoose.Schema //first letter capital means it is either class or constructor
const menuSchema = new Schema({ //this menuSchema is the blueprint/document of what is in our table in db
    name: { type:String, required: true }, //ye name ki value bhi ek object hai
    image: { type:String, required: true },
    price: { type:Number, required: true } ,
    size: { type:String, required: true }
})


module.exports = mongoose.model('Menu', menuSchema) //aur yahan pe ye Menu naam ka model create krlia