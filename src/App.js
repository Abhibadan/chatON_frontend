import React,{useEffect, useState} from "react";
import { Routes, Route,useLocation,useNavigate } from "react-router-dom";
import { Routes, Route,useLocation,useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Navbar from "./pages/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-bootstrap';
function App() {
  const location=useLocation();
  const navigate=useNavigate();
  const discard_route=['/login','/registration'];
  const user=JSON.parse(localStorage.getItem('Auth'))||false;
  console.log(user);
  return (
    <div className="App">
      {!discard_route.includes(location.pathname)&&<Navbar user={user}/>}
      {!discard_route.includes(location.pathname)&&<Navbar user={user}/>}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={user?._id && localStorage.hasOwnProperty('token')?<Chat/>:<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
