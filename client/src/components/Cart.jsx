import React, {useEffect, useState} from "react";
import CartCard from "./CartCard";

import CpuPicture from "./img/cpu.jpg";
import GpuPicture from "./img/gpu.jpg";


export default function Cart(props) {

    const cart = props.cart;
    const username = props.username;
    const passCart = props.passCart;
    const [arrCart, setArrCart] = useState(Object.values(cart))
    const [cartComp, setCartComp] = useState()

    useEffect(() => {

        console.log(cart)
        
        setCartComp(Object.values(cart).map((item, index) =>
        <CartCard key={index} id={index}
                  passCart={passCart}
                  username={username}
                  mainText={item.mainText}
                  price={item.price}
                  type={item.type}
                  image={item.type === "cpu" ? CpuPicture : GpuPicture} />));

    }, [cart])




    return (
        <div>
            {cartComp}
        </div>
    )

    
    



}