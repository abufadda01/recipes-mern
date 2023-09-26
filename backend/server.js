const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()



// import the userRouter handler file
const usersRouter = require('./ROUTES/usersRoute')
// import the userRouter handler file
const recipesRouter = require('./ROUTES/recipesRoute')



// import the User class var which contains users schema , model 
const User = require('./MODELS/usersModel')
// import the Recipe class var which contains users schema , model 
const Recipe = require('./MODELS/recipesModel')


const app = express()

// middleware
app.use(express.json())
app.use(cors())


// connect the database to our mongoDB compass
mongoose.connect(process.env.MONGO_URL_COMPASS , {useNewUrlParser : true , useUnifiedTopology : true })
    .then(console.log('RECIPE DATABASE  CONNECTED SUCCESSFULY'))
    



// for every '/auth' end point handle it using usersRouter file
app.use('/auth' , usersRouter)
// for every '/recipes' end point handle it using recipesRouter file
app.use('/recipes' , recipesRouter)






// connect the server on port 3001
const PORT = process.env.PORT || 3001

app.listen(PORT , () => {
    console.log(`server started on port ${PORT}`)
})