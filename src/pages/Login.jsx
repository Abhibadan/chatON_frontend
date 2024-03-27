import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = ({setLoginState,setLoginUser}) => {
  const navigation=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const email_regex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email==='' || !email_regex.test(email)){
      return toast.warn("Please enter valid email");
    }else if(password===''){
      return toast.warn("Please enter your password");
    }
    axios.post(`${process.env.REACT_APP_BACKEND}/login`,
    {
      email:email,
      password:password
    }).then((response)=>{
      if(response.status===200){
        localStorage.setItem('token',response.data.auth);
        setLoginState(true);
        setLoginUser(response.data.user._id);
        toast.success(response.data.message);
        navigation('/chat')
      }
    }).catch((error)=>{
      console.log(error.response);
    });
  }
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
            <label htmlFor="loginEmail" className="visually-hidden">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="loginEmail"
              placeholder="Email"
              onChange={(e)=>{setEmail(e.target.value)}}
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
              Confirm identity
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
