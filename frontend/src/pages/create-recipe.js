import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"

import useGetUserId from '../hooks/useGetUserId'

const CreateRecipe = () => {

    const userID = useGetUserId()
    const navigate = useNavigate()

    const [recipe , setRecipes] = useState({
        name : "",
        ingredients : [],
        instructions : "" ,
        imageURL : "" ,
        cookingTime : 0 ,
        userOwner : userID
    })

    const [cookies , _] = useCookies(["access_token"])


    const handleChange = (e) => {
        // get both event.target.value and event.target.name
        const {name , value} = e.target
        // update the setRecipes state
        // key [name]:the_new_value
        setRecipes({...recipe , [name] : value})
    }


    const addIngredients =  () => {
        setRecipes({...recipe , ingredients : [...recipe.ingredients , ""]})
    }


    const handleIngredientChange = (e , index) => {
        const {value} = e.target
        const ingredients = recipe.ingredients
        ingredients[index] = value

        setRecipes({...recipe , ingredients})

        console.log(recipe)

    }


    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:3001/recipes" , recipe , {
                headers : {authorized : cookies.access_token}})

            alert("Recipe created !")
            navigate('/')

        } catch (error) {
            console.error(error)
        }

    }


    return (
        <div className="create-recipe">

           <h2>Create a Recipe</h2>

           <form onSubmit={onSubmit}>

                <label htmlFor="name" >Recipe Name</label>
                <input type="text" id="name" name='name' onChange={handleChange} />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                ></textarea>

        
                <label htmlFor="ingredients">Ingredients</label>  
                {recipe.ingredients.map((ingredient , index) => {
                    return (
                        <input 
                        type='text'
                        key={index}
                        name="ingredients"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(e ,index)}/>
                    )
                })}              
                



                <button type="button" onClick={addIngredients}>
                    Add Ingredient
                </button>

                <label htmlFor="instructions">Instructions</label>
                <textarea
                     id="instructions"
                     name="instructions"
                     onChange={handleChange}
                ></textarea>

                <label htmlFor="imageURL">Image URL</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageURL"
                    onChange={handleChange}
                 />

                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input
                  type="number"
                  id="cookingTime"
                  name="cookingTime"
                  onChange={handleChange} 
                />


                <button type="submit" style={{marginTop : "20px"}}>Create Recipe</button>
        
        </form>

    </div>
    )
}

export default CreateRecipe