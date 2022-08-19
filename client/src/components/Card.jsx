import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import CardCSS from "./Card.module.css";
import ItemPicture from "./img/gpu.jpg";
export default function Card(props) {

    const passCart = props.passCart;
    const cart = props.cart
    console.log("test")
    function addToCart(e) {
        console.log()
        e.preventDefault();
        const item = {
            mainText: props.mainText,
            price: props.price,
            type: props.type
        }
        const user = {
            username: props.username
        }
        const compoundEntity = {
            theContent: item,
            theUser: user
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(compoundEntity)
        }

        fetch("/api/add", requestOptions)
        .then(response => response.json())
        .then(response => passCart(response))

        alert("Added to Cart")
    }


    return (
        <div className={CardCSS.card}>
            <img src={props.image} className={CardCSS.itempicture} alt="item picture"/>
            <h3 className={CardCSS.subitem}>{props.mainText}</h3>
            <h4 className={CardCSS.subitem}>{props.price}</h4>
            <button onClick={addToCart.bind(this)} className={`${CardCSS.subitem} ${CardCSS.button}`} type="button">Add to Cart</button>
        </div>
    )
}