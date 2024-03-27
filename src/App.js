import React,{useEffect, useState} from "react";
import { Routes, Route,useLocation, json } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Navbar from "./pages/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-bootstrap';
function App() {
  const [loginState,setLoginState]=useState(false);
  const [loginUser,setLoginUser]=useState('');

  const location=useLocation();
  const discard_route=['/','/login','/registration'];
  
  return (
    <div className="App">
      {!discard_route.includes(location.pathname)&&<Navbar/>}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setLoginState={setLoginState} setLoginUser={setLoginUser}/>}/>
        <Route path='/chat' element={<Chat loginState={loginState} loginUser={loginUser} />}/>
      </Routes>
    </div>
  );
}

export default App;
