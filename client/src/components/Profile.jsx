import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import ProfileCSS from "./Profile.module.css";

import {useNavigate} from "react-router-dom";


export default function Profile(props) {
    const username = props.username;
    const isLoggedIn = props.isLoggedIn;
    const cart = props.cart;
    const passCart = props.passCart;
    const isProfile = true;
    const passIsLoggedIn = props.passIsLoggedIn;
    function logout() {
        passIsLoggedIn(false)
    }
    let navigate = useNavigate();
    const routeChange = () => {

        let path = "/login";
        navigate(path);
    }


    if (isLoggedIn) {
        return (
            <div>
                <Navbar isProfile={isProfile}/>
                <button onClick={logout} className={ProfileCSS.button}>Log Out</button>
                <h1 className={ProfileCSS.username}>{username}</h1>
                <h2 className={ProfileCSS.username}>Cart:</h2>
                <Cart passCart={passCart} username={username} cart={cart} />
    
            </div>
    
        )
    } else {
        
        routeChange();
    }

}