const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

// import the User class var which contains users schema , model 
const User = require('../MODELS/usersModel')

// import custom middleware
const userAuth = require('../MIDDLEWARE/usersAuthMiddleware')

const router = express.Router()



// post route to register a new user
router.post('/register' , async (req , res) => {
    const {username , password} = req.body

    try {
        let user = await User.findOne({username})

        if(user) {
            res.status(400).json({message : 'user already register with this user name'})
            return;
        }

        user = new User({
            username ,
            password
        })


        // create the salt random value , hashedPassword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password , salt)

        // override the user password with the hashed one
        user.password = hashedPassword

        await user.save()

        res.send(user)


    } catch (error) {
        res.status(400).json({error : error.message})
    }
})






// post route to sign in the user
router.post('/signin' , async (req , res) => {
    const {username , password} = req.body

    try {

        let user = await User.findOne({username})

        // if the user not exist , so user could't sign in
        if(!user) {
            res.status(400).json({error : "user don't have a valid account , go and register "})
            return;
        }

        const isPasswordValid = await bcrypt.compare(password , user.password)
        
        // check the password value with the saved one
        if(!isPasswordValid) {
            res.status(400).json({error : "password not match !"})
            return ;
        }


        // create the token
        const token = jwt.sign({id : user._id , username : user.username} , process.env.PRIVATE_KEY )

        res.json({token , userID : user._id})

    } catch (error) {
        res.status(400).json({error : error.message})
    }
})





module.exports = router