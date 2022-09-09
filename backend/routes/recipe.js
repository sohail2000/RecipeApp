const express = require('express')
const {
    createRecipe,
    getRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    searchByName,
    searchByIngredients,
} = require('../controllers/recipeController')

const router = express.Router()

//GET all recipe
router.get('/', getRecipes)

//GET single recipe
router.get('/:id', getRecipe)

//POST a new recipe
router.post('/', createRecipe)

//DELETE a recipe
router.delete('/:id', deleteRecipe)

//UPDATE a recipe
router.patch('/:id', updateRecipe)

//search by title
router.get('/title/:title', searchByName)

//search by ingredients
router.get('/ingredient/:ingredients', searchByIngredients)

module.exports = router