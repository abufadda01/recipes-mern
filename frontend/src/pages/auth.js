import { useState } from "react"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'


const Auth = () => {
    return (
        <div className="auth">
            <Login/>
            <Register/>
        </div>
    )
}



const Login = () => {

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    const [_ , setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()


    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("http://localhost:3001/auth/signin" , {
                username ,
                password
            })

            setCookies("access_token" , response.data.token)

            window.localStorage.setItem("userID" , response.data.userID)

            navigate("/")


        } catch (error) {
            console.error(error)
        }

    }


    return(
        <div className="auth-container">
            
        <form onSubmit={onSubmit}>

            <h2>Log in</h2>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type='text' id="username" value={username} onChange={(e) => setUsername(e.target.value) }></input>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <button type="submit">Log in</button>

        </form>

    </div>
    )
}



const Register = () => {

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")


    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register" , {
                username ,
                password
            })
            alert("Registration completed ! , go and sign in")
        } catch (error) {
            console.error(error)
        }
    }



    return(
        <div className="auth-container">
            
            <form onSubmit={onSubmit}>

                <h2>Register</h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type='text' id="username" value={username} onChange={(e) => setUsername(e.target.value) }></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <button type="submit">Register</button>

            </form>

        </div>
    )
}





export default Auth