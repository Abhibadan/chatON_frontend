import React, { useState, useEffect, useContext } from "react";
import {io} from "socket.io-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/userLogin";
import { SocketContext } from "../SocketProvider";
const Login = () => {
  const {socket,setSocket}=useContext(SocketContext);
  const navigation=useNavigate();
  const dispatch=useDispatch();
  const [email,setemail]=useState('');
  const [password,setPassword]=useState('');
  const user=JSON.parse(localStorage.getItem('Auth'));
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(email==='' ){
      return toast.warn("Please enter valid email number");
    }else if(password===''){
      return toast.warn("Please enter your password");
    }
    dispatch(login({email,password})).then((response)=>{
      if(response.type==="login/fulfilled"){
        const newSocket = io(process.env.REACT_APP_SOCKET_BACKEND, {
          query: {
            user_id: response.payload.user._id,
          },
          auth: { token:response.payload.auth },
        });
        setSocket(newSocket);
        navigation('/friends');
      }
    });
  }
  useEffect(()=>{
    if(user?._id && localStorage.hasOwnProperty('token')){
      navigation('/chat')
    }
  },[user]);
  useEffect(()=>{
    if(socket!==null && socket!==undefined){
      console.log(socket);
      socket.on("connect", () => {
        console.log(socket.id);
      });
    }
  },[socket]);
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{'height':'100vh'}}>
        <form className="row g-3 d-flex align-items-center flex-column " onSubmit={handleOnSubmit}>
        <div className="col-auto">
            <span>
              LOGIN
            </span>
          </div>
          <div className="col-auto">
            <label htmlFor="loginemail" className="visually-hidden">
              email
            </label>
            <input
              type="text"
              className="form-control"
              id="loginemail"
              placeholder="email"
              onChange={(e)=>{setemail(e.target.value)}}
              // value="email@example.com"
            />
          </div>
          <div className="col-auto">
            <label htmlFor="loginPassword" className="visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Password"
              onChange={(e)=>{setPassword(e.target.value)}}

            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
