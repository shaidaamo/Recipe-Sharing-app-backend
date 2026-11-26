const Review = require('../models/Review')
const Recipe = require('../models/Recipe')


async function createRecipe(req,res){
    try{
        const { title, description, ingredients,steps,cookTime,category,image} = req.body
        const newRecipe = await Recipe.create({
            title,
            description,
            ingredients,
            steps,
            cookTime,
            category,
            image,
            author: req.user._id
        })
        res.status(201).json(newRecipe)

    }catch(err){
        console.log(err)
    }
}
async function getAllrecipes(req,res){
    try{
        const allrecipes = await Recipe.find().populate('author')
        res.status(200).json(allrecipes)
    }catch(err){
        console.log(err)
    }
}
async function getOneRecipe(req,res){
    try{
        const oneRecipe = await Recipe.findById(req.params.recipeId).populate('author')
        if(!oneRecipe){
            return res.status(404).json({message:'Recipe not Found'})
        }
        const reviews = await Review.find({recipe: req.params.recipeId}).populate('author')

        res.status(200).json({recpie: oneRecipe, Reviews: reviews})
    }catch(err){

        console.log(err)
    }
}