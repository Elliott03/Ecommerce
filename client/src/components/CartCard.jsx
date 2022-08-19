import React from "react";
import CartCardCSS from "./CartCard.module.css";

export default function CartCard(props) {
    const passCart = props.passCart;

    function deleteFromCart(e) {
        e.preventDefault();

        const item = {
            id: props.id,
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

        
        fetch("/api/delete", requestOptions)
        .then(response => response.json())
        .then(response => {
            passCart(response)

        })


    }
    
    return (
        <div className={CartCardCSS.card}>
            <img src={props.image} className={CartCardCSS.itempicture} alt="item picture"/>
            <h3 className={CartCardCSS.subitem}>{props.mainText}</h3>
            <h4 className={CartCardCSS.subitem}>{props.price}</h4>
            <button onClick={deleteFromCart} className={`${CartCardCSS.subitem} ${CartCardCSS.button}`} type="button">Remove From Cart</button>
        </div>
    )
}