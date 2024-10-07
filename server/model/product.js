const mongoose = require("mongoose");
const Review = require("./Rating");
const productSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    },
    rating:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }
})
const Product = mongoose.model("Product",productSchema);
module.exports = Product;