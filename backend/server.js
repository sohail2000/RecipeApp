require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipe')
const userRoutes = require('./routes/user')

//express app
const app = express()

//MIDDLEWARE
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/recipes',recipeRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () => {
            console.log('connnected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

