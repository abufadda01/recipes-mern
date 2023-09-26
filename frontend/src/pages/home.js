import { useState , useEffect } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"

import useGetUserId from '../hooks/useGetUserId'


const Home = () => {
    
    const userID = useGetUserId()
    const [recipes , setRecipes] = useState([])
    const [savedRecipes , setSavedRecipes] = useState([])

    const [cookies , _] = useCookies(["access_token"])



    useEffect(() => {

        const fetchRecipesFun = async () => {
            try {
               const response = await axios.get("http://localhost:3001/recipes")
                setRecipes(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }


        const fetchSavedRecipesFun = async () => {
            try {
               const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
               setSavedRecipes(response.data.savedRecipes) 
            } catch (error) {
                console.error(error)
            }
        }

        fetchRecipesFun()
        
        if(cookies.access_token){
            fetchSavedRecipesFun()
        }

    } , [])



    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes" , {
                recipeID ,
                userID
            } , {headers : {authorized : cookies.access_token}})

            setSavedRecipes(response.data.savedRecipes)

        } catch (error) {
            console.error(error)
        }
    }


    // return a boolean value
    const isRecipeSaved = (recipeID) => {
        return savedRecipes.includes(recipeID)
    }


    return (
        <div>

            <h1>Recipes</h1>

            <ul>
                {recipes.map((recipe) => {
                    return(
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.name}</h2>

                                <button
                                 onClick={() => saveRecipe(recipe._id)}
                                >
                                    save recipe
                                    {/* {isRecipeSaved(recipe._id) ? "already saved" : "save recipe" } */}

                                </button>

                            </div>
                            <div className="instructions">
                                <p>{recipe.instructions}</p>
                            </div>
                            <img src={recipe.imageURL} alt={recipe.name}/>
                            <p>Cooking Time : {recipe.cookingTime} min </p>
                        </li>
                    )})}
            </ul>
        </div>
    )
}

export default Home