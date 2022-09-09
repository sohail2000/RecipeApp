const Recipe = require('../modals/recipeModal')
const mongoose  = require('mongoose')

// get all recipes
const getRecipes  = async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1})

    res.status(200).json(recipes)
}

//get a single recipe
const getRecipe = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }

    const recipe = await Recipe.findById(id)

    if(!recipe){
        return res.status(400).json({error: 'No such recipe'})
    }
    res.status(200).json(recipe)
}


// create a new recipe
const createRecipe = async(req, res) =>{
    const { title, ingredients, steps } = req.body

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!ingredients) {
        emptyFields.push('ingredients')
    }
    if (!steps) {
        emptyFields.push('steps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    //add doc to db
    try {
        const recipe = await Recipe.create({ title, ingredients, steps })
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//delete a recipe
const deleteRecipe = async(req, res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    const recipe = await Recipe.findByIdAndDelete({_id: id})

    if (!recipe) {
        return res.status(400).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipe)
}

//update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such recipe' })
    }

    const recipe = await Recipe.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!recipe) {
        return res.status(400).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipe)
}

const searchByName = async (req, res) => {
    var regex = new RegExp(req.params.title,'i');

    const recipe = await Recipe.find({title:regex})

    if (!recipe) {
        return res.status(400).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipe)

}

const searchByIngredients = async (req, res) => {
    var regex = new RegExp(req.params.ingredients,'i');

    const recipe = await Recipe.find({ingredients:regex})

    if (!recipe) {
        return res.status(400).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipe)

}

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    searchByName,
    searchByIngredients
}