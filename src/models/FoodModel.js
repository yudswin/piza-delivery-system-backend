const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        default:"Veg"
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:5
    },
    description:{
        type:String,
        required:true,
    },
    countInStock:{
        type:Number,
    },
    discount: {
        type: Number,
        default: 0, 
    },
    isBestSeller: {
        type: Boolean,
        default: false,
    }
},{
    timestamps:true
})

const Food = mongoose.model('Food',foodSchema)
module.exports = Food