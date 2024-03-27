import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigation=useNavigate();
  const [phone,setphone]=useState('');
  const [password,setPassword]=useState('');
  
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(phone==='' ){
      return toast.warn("Please enter valid phone number");
    }else if(password===''){
      return toast.warn("Please enter your password");
    }
    axios.post(`${process.env.REACT_APP_BACKEND}/login`,
    {
      phone:phone,
      password:password
    }).then((response)=>{
      if(response.status===200){
        localStorage.setItem('token',response.data.auth);
        localStorage.setItem('Auth',JSON.stringify(response.data.user));
        toast.success(response.data.message);
        navigation('/chat')
      }
    }).catch((error)=>{
      toast.error(error.response.data.message);
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
            <label htmlFor="loginphone" className="visually-hidden">
              phone
            </label>
            <input
              type="text"
              className="form-control"
              id="loginphone"
              placeholder="phone"
              onChange={(e)=>{setphone(e.target.value)}}
              // value="phone@example.com"
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
