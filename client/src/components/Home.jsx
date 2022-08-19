import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from  "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Card from "./Card";
import HomeCSS from "./Home.module.css";
import GpuPicture from "./img/gpu.jpg";
import CpuPicture from "./img/cpu.jpg";

export default function Home(props) {
    const [contentComponents, setContentComponents] = useState([])
    const [searchResponse, setSearchResponse] = useState([]);
    const passCart = props.passCart;
    const searchText = props.searchText;
    const passSearchText = props.passSearchText;

    let navigate = useNavigate();
    const routeChange = () => {

        let path = "/login";
        navigate(path);
    }

    function emptySearch() {
        console.log(searchText)
        console.log(searchText.length)
        if (searchText.length === 0) {
            fetch("/api/content")
            .then(response => response.json())
            .then(response => {
                setContentComponents(response.map((item, index) =>
                <Card key={index} id={index}
                          passCart={passCart}
                          mainText={item.mainText}
                          price={item.price}
                          type={item.type}
                          image={item.type === "cpu" ? CpuPicture : GpuPicture} />));
        
            })
        }
    }


    function search(searchResponse) {
        
        
            console.log(searchResponse)
            setContentComponents(searchResponse.map((item, index) =>
            <Card key={index} id={index}
                      username={props.username}
                      passCart={passCart}
                      mainText={item.mainText}
                      price={item.price}
                      type={item.type}
                      image={item.type === "cpu" ? CpuPicture : GpuPicture} />));
        


    }

    useEffect(() => {
            fetch("/api/content")
            .then(response => response.json())
            .then(response => {
                setContentComponents(response.map((item, index) =>
                <Card key={index} id={index}
                          username={props.username}
                          passCart={passCart}
                          mainText={item.mainText}
                          price={item.price}
                          type={item.type}
                          image={item.type === "cpu" ? CpuPicture : GpuPicture} />));
        
            })


      }, []);





    if (props.isLoggedIn) {


        return (
            <div>
                <Navbar emptySearch={emptySearch} search={search} searchText={searchText} passSearchText={passSearchText}/>
                {contentComponents}
            </div>

        )
    } else {

        
        return (
            

            routeChange()
        )
    }

}