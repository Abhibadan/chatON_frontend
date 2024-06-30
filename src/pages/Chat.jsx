import React, { useState,useEffect, useContext } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addNewMessage,addOldMessage } from "../redux/user/messaging";
import { SocketContext } from "../SocketProvider";
const Chat = () => {
  const {socket,setSocket}=useContext(SocketContext);
  const{state}=useLocation();
  console.warn(state);
  const navigate =useNavigate();
  const dispatch=useDispatch();
  const messages=useSelector((state)=>state.messaging.message);
  const [message, setMessage] = useState("");
  const [oldMessages,setOldMessages]=useState([]);
  const token=localStorage.getItem('token');
  const user=JSON.parse(localStorage.getItem('Auth'))||false;
  const auth_check=user?._id && localStorage.hasOwnProperty('token');
  useEffect(() => {
    if(user?._id && localStorage.hasOwnProperty('token')){
      if(socket!=null && socket!=undefined){
        socket.on("chat message", () => {
          console.log("chat message");
        });
        socket.on('join_user',(online_users)=>{
          console.log(online_users)
        });
        socket.on("recived message",(message)=>{
          console.warn("message",message);
        });

        socket.on("connect_error", (err) => {
          toast.error(err.message);
          localStorage.removeItem('token');
          localStorage.removeItem('Auth');
          navigate("/login");
        });
      }
      
    }else{
      toast.error("Please login first");
      navigate("/login");
    }
    
    // return () => {
    //   socket.emit("offline",{user_id: user._id,socket_id:socket.id});
    //   socket.disconnect(); 
    // };
  }, []);
  // console.log(oldMessages);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(message.length>0){
      socket.emit('chat message', {message,sender:user?._id,receiver:state.user_id});
      setMessage('');
    }
    
  };
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{'height':'100vh'}}>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{'height':'300px','width':'200px','overflowY':'scroll'}}>
        {/* {
          oldMessages.map((data,index)=>(
            <span key={index}>{data.message}</span>
          ))
        } */}
      </div>
        <form className="row g-3 d-flex align-items-center flex-column " onSubmit={handleOnSubmit}>
        <div className="col-auto">
            <span>
              CHAT
            </span>
          </div>
          <div className="col-auto">
            <label htmlFor="chatInput" className="visually-hidden">
              your message
            </label>
            <textarea
              className="form-control"
              id="chatInput"
              placeholder="Your Message .."
              onChange={(e)=>{setMessage(e.target.value)}}
              value={message}
            />
          </div>
          
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
