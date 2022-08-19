import React, {useState} from "react";
import LoginCSS from "./Login.module.css";

import {Link, useNavigate} from "react-router-dom";

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();
    const routeChange = () => {

        let path = "/home";
        navigate(path);
    }
    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        };


        fetch('/api/login',requestOptions)
        .then(response => response.json() )
        .then( response => {
            if (response.username === undefined) {
                setUsername('')
                setPassword('')
                console.log("Login Unsuccesful")
                return
            }
            props.passUsername(response.username);
            props.passCart(response.cart);
            props.passIsLoggedIn(true);
            routeChange();
        } );
            
    }


    return (
        <form className={LoginCSS.flexbox} onSubmit={handleSubmit}>
            <div className={LoginCSS.container}>
                <h1 className={LoginCSS.login}>Login</h1>
                <h2 className={LoginCSS.usernametext}>Username:</h2>
                <input 
                    className={LoginCSS.usernameinput} 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <h2 className={LoginCSS.passwordtext}>Password:</h2>
                <input 
                    className={LoginCSS.passwordinput} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <br /> 
                <input value="Login" className={LoginCSS.submit} type="submit" />
                <br />
                <br />
                <Link className={LoginCSS.orsignup}to="/signup">Or Signup</Link>
            </div>
        </form>
    );
}