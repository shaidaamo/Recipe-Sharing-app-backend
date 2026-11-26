const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  ingredients: {
    type: String,
    required: true
  },
  steps: {
    type: String
  },
  cookTime: {
     type: Number
  },
  category: {
    type: String,
    enum:['Breakfast','Lunch','Dinner','Dessarts']
  },
  image :{
    type: String
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;