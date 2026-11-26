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