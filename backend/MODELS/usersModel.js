const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    savedRecipes : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'recipes'
    }]
})


const User = mongoose.model('users' , userSchema)



// mongoose schema hook (middleware) to hash the user password before save it
// we must pass next() to move the priority to the next middleware
// userSchema.pre('save' , async function(next){
//     // this keyword refers to the current user doc obj
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(this.password , salt)

//     // override the user password with the hashed one
//     this.password = hashedPassword

//     // move to the next middleware
//     next()
// })




module.exports = User