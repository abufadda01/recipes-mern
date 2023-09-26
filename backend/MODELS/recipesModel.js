const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    ingredients : [{
        type : String ,
        required : true
    }] ,
    instructions : {
        type : String ,
        required : true
    },
    imageURL : {
        type : String ,
        required : true
    },
    cookingTime : {
        type : Number ,
        required : true
    },
    // userOwner key will be a reference obj id to the user doc who create this recipe
    userOwner : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'users'
    }

})


const Recipe = mongoose.model('recipes' , recipeSchema)


module.exports = Recipe