const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
  rating: {
      type: String,
      },
    reviewText: {
      type: String,
      required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
  },{ timestamps: true },
)

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
