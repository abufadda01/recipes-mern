const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const Recipe = require('../MODELS/recipesModel')
const User = require('../MODELS/usersModel')

// import custom middleware
const userAuth = require('../MIDDLEWARE/usersAuthMiddleware')

const router = express.Router()



// get route to return all recipes
router.get('/' , async (req , res) => {
    try {
        const recipes = await Recipe.find({})
        res.json(recipes)
    } catch (error) {
        res.json({error : error})
    }
})




// post route to add a new recipe
// check userAuth custom middleware before add a new recipe
router.post('/' , userAuth , async (req , res) => {
    const {name , ingredients , instructions , imageURL , cookingTime , userOwner} = req.body

    try {
        let recipe = new Recipe({
            name ,
            ingredients ,
            instructions,
            imageURL,
            cookingTime,
            userOwner
        })

        await recipe.save()

        res.json(recipe)

    } catch (error) {
        res.json({error : error})
    }
})




// put route to update saved recipes
// check userAuth custom middleware before add a recipe to the savedRecipes
router.put('/' , userAuth , async (req , res) => {
    // get the recipe id that we want to save it
    // get the user id who wants to save this recipe
    const recipe = await Recipe.findById(req.body.recipeID)
    const user = await User.findById(req.body.userID)

    try {
        // acces the savedRecipes key inside the user model (array of obj) then add (push) the wanted recipe
        await user.savedRecipes.push(recipe)
        await user.save()

        res.json({savedRecipes : user.savedRecipes})

    } catch (error) {
        res.json({error : error})
    }
})




// get route to get the saved recipe for specific user
router.get('/savedRecipes/ids/:userID' , async (req , res) => {
    try {
        const user = await User.findById(req.params.userID)
        res.json({savedRecipes : user.savedRecipes})

    } catch (error) {
        res.json({error : error})
    }
})




router.get('/savedRecipes/:userID' , async (req , res) => {
    try {
        const user = await User.findById(req.params.userID)
        // return the saved recipes which they are $in this userID savedRecipes array 
        const savedRecipes = await Recipe.find({
            _id : {$in : user.savedRecipes}
        })

        res.json({savedRecipes})

    } catch (error) {
        res.json({error : error})
    }
})







module.exports = router