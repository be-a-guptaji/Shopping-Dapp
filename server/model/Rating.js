const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    rate:{type:Number},
    count:{type:Number}
});

const Review = mongoose.model("Review",ReviewSchema);
module.exports = Review;