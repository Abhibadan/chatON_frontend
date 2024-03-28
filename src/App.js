import React,{useEffect, useState} from "react";
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
  const [socket,setSocket]=useState(null);
  return (
    <div className="App">
      {!discard_route.includes(location.pathname)&&<Navbar user={user} socket={socket} setSocket={setSocket}/>}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login socket={socket} setSocket={setSocket}/>}/>
        <Route path='/chat' element={user?._id && localStorage.hasOwnProperty('token')?<Chat socket={socket} setSocket={setSocket}/>:<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
