import React, {useState} from "react";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Card from "./components/Card";
import GpuPicture from "./components/img/gpu.jpg";
import CpuPicture from "./components/img/cpu.jpg";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchText, setSearchText] = useState('')

  function passUsername(items) {
    setUsername(items);
  }
  function passCart(items) {
    setCart(items);

  }
  function passIsLoggedIn(items) {
    setIsLoggedIn(items);

  }
  function passSearchText(items) {
    setSearchText(items)
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<Login passIsLoggedIn={passIsLoggedIn} passUsername={passUsername} passCart={passCart}/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/home" element={<Home searchText={searchText} passSearchText={passSearchText} passCart={passCart} cart={cart} username={username} isLoggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<Profile passCart={passCart} cart={cart} username={username} passIsLoggedIn={setIsLoggedIn}isLoggedIn={isLoggedIn}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
