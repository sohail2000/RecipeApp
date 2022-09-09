const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type: String,
        reqiured: true
    },
    steps:{
        type: String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('recipe', recipeSchema)