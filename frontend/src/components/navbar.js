import { Link, redirect } from "react-router-dom"
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const [cookies , setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()

    // logout fun that update the cookie value to empty , delete the userID localstoragec , redirect to the auth page
    const logout = () => {
        setCookies("access_token" , "")
        window.localStorage.removeItem("userID")
        navigate("/auth")
    }

    return (
        <div className="navbar">
            
            <Link to='/ '>Home</Link>
            <Link to='/created-recipe '>create-recipe</Link>

            {!cookies.access_token
             ? (<Link to='/auth '>Login/Register</Link>) 
             :<>
                <Link to='/saved-recipe '>saved-recipe</Link>
                <button onClick={logout}>Log out</button>
             </>
            }
           
        </div>
    )
}

export default Navbar