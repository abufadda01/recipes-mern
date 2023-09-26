import { useState , useEffect } from "react"
import axios from "axios"

import useGetUserId from '../hooks/useGetUserId'


const SavedRecipes = () => {
    
    const userID = useGetUserId()
    const [savedRecipes , setSavedRecipes] = useState([])


    useEffect(() => {

        const fetchSavedRecipesFun = async () => {
            try {
               const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
               setSavedRecipes(response.data.savedRecipes) 
            } catch (error) {
                console.error(error)
            }
        }

        fetchSavedRecipesFun()

    } , [])





    return (
        <div>

            <h1>Saved Recipes</h1>

            <ul>
                {savedRecipes.map((recipe) => {
                    return(
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.name}</h2>
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

export default SavedRecipes