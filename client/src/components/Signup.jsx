import React, {useState} from "react";
import SignupCSS from "./Signup.module.css";

import {Link, useNavigate} from "react-router-dom";
export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let navigate = useNavigate();
    const routeChange = () => {

        let path = "/login";
        navigate(path);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        }

        if (username.length < 5) {
            alert("Username must be at least 5 characters")
            return
        }

        const user = {
            username: username,
            password: password
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        };

        fetch("/api/signup", requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response === false) {
                    alert("Username Already Exists")
                } else if (response === true) {
                    routeChange();
                }
            })

    }
    return (
        <form className={SignupCSS.flexbox} onSubmit={handleSubmit}>
            <div className={SignupCSS.container}>
                <h1 className={SignupCSS.signup}>Signup</h1>
                <h2 className={SignupCSS.usernametext}>Username:</h2>
                <input 
                    className={SignupCSS.usernameinput}    
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <h2 className={SignupCSS.passwordtext} >Password:</h2>
                <input 
                    className={SignupCSS.passwordinput} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <h2 className={SignupCSS.confirmpasswordtext} >Confirm Password:</h2>
                <input 
                    className={SignupCSS.confirmpasswordinput} 
                    type="password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <br /> 
                <input className={SignupCSS.submit} type="submit" />
                <br />
                <br />
                <Link className={SignupCSS.orlogin} to="/login">Or Login</Link>
            </div>
        </form>
    )
}
