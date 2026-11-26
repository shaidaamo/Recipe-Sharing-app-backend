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
async function updateOneRecipe(req,res){
    try{
        const foundRecipe = await Recipe.findById(req.params.recipeId)

        if(!foundRecipe){
            return res.status(404).json({message:'Recipe not Found'})
        }

        if(!foundRecipe.author.equals(req.user._id)){
            return res.status(403).json({message:'You are not Able to change this Recipe'})
        }
        const { title, description, ingredients,steps,cookTime,category,image} = req.body
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId,{
            title,
            description,
            ingredients,
            steps,
            cookTime,
            category,
            image
        }, {returnDocument: 'after', runValidators:true})
        res.status(200).json(updatedRecipe)
    }catch(err){
        console.log(err)
    }
}
async function deleteOneRecipe(req,res){
    try{
        const foundRecipe = await Recipe.findById(req.params.recipeId)

        if(!foundRecipe){
            return res.status(404).json({message:'Recipe not Found'})
        }

        if(!foundRecipe.author.equals(req.user._id)){
            return res.status(403).json({message:'You are not Able to delete this Recipe'})
        }

        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId)
        res.sendStatus(204)
    }catch(err){
        console.log(err)
    }
}