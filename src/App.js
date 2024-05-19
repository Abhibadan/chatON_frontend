import React,{useEffect, useState} from "react";
import { Routes, Route,useLocation,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Navbar from "./pages/Navbar";
import Test from "./pages/Test";
import { ToastContainer } from "react-toastify";
import  io  from "socket.io-client";
import 'react-bootstrap';
function App() {
  const location=useLocation();
  const navigate=useNavigate();
  const discard_route=['/login','/registration'];
  const user=JSON.parse(localStorage.getItem('Auth'))||false;
  const token=localStorage.getItem('token');
  const [socket,setSocket]=useState(null);
  useEffect(()=>{
    if(user!==false && token!==null && socket===null ){
      const newSocket = io(process.env.REACT_APP_SOCKET_BACKEND, {
        reconnectionAttempts:3,
        query: {
          user_id: user._id,
        },
        auth: { token:token },
      });
      newSocket.on("connect_error", (err) => {

        toast.error(err.message);
        newSocket.emit("offline",{user_id: user._id,socket_id:socket.id});
        newSocket.disconnect();
        localStorage.removeItem('token');
        localStorage.removeItem('Auth');
        navigate("/login");
      });
      setSocket(newSocket);
      console.warn(newSocket.id);
    }
  },[user,token]);
  return (
    <div className="App">
      {!discard_route.includes(location.pathname)&&<Navbar user={user} socket={socket} setSocket={setSocket}/>}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/login' element={<Login socket={socket} setSocket={setSocket}/>}/>
        <Route path='/chat' element={user?._id && localStorage.hasOwnProperty('token')?<Chat socket={socket} setSocket={setSocket}/>:<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
