import React, {useState} from "react";
import NavbarCSS  from "./Navbar.module.css";
import Search from "./img/search.png"

import {Link} from "react-router-dom";


export default function Navbar(props) {
    const searchText = props.searchText;
    const passSearchText = props.passSearchText;
    const passSearchResponse = props.passSearchResponse;
    function search() {
        if (searchText.length === 0) {
            props.emptySearch();
        }
    
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: searchText
        };

        fetch("/api/search", requestOptions)
        .then(response => response.json())
        .then(response => props.search(response))
    }

    return (
        <div className={NavbarCSS.flexbox}>
            <div className={NavbarCSS.leftflex}>
                <Link className={NavbarCSS.title} to="/home">Ecommerce</Link>
            </div>
            {!props.isProfile ? 
                        <div className={NavbarCSS.rightflex}>
                        <input onChange={(e) => passSearchText(e.target.value)} type="text" className={NavbarCSS.searchtext} />
                        <button onClick={search} type="button" className={NavbarCSS.submit}>
                            <h4>Search</h4>
                            <img src={Search} alt="search button" className={NavbarCSS.searchbutton} />
                        </button>
                        <Link className={NavbarCSS.rightsubflex}to="/profile">Profile</Link>
                        
                    </div> :<div></div>
            }

        </div>
    );
}