const router = require("express").Router();
const recipeController = require ('../controllers/recipies.controller')
const verifyToken = require('../middleware/verifyToken')


//Recipe Routes
router.post('/', verifyToken, recipeController.createRecipe)

router.get('/', recipeController.getAllrecipes)

router.get('/my-recipes', verifyToken, recipeController.getauthorrecipes)

router.get('/:recipeId',verifyToken, recipeController.getOneRecipe)

router.put('/:recipeId',verifyToken, recipeController.updateOneRecipe)

router.delete('/:recipeId',verifyToken, recipeController.deleteOneRecipe )


//Review Routes
router.post('/:recipeId/reviews', verifyToken, recipeController.createOneReview)
router.delete('/:recipeId/reviews/:reviewId', verifyToken, recipeController.deleteReview)

//My Recipes



module.exports = router;