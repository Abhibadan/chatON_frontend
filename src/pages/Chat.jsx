import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Chat = ({loginState,loginUser}) => {
  const navigate =useNavigate();
  const [message, setMessage] = useState("");
  const [oldMessages,setOldMessages]=useState([]);
  const [socket,setSocket]=useState(null);
  const token=localStorage.getItem('token');
  useEffect(() => {
    const socket= io("http://127.0.0.1:5050",{ query: {
      user_id: loginUser,
    },auth: { token }});
    setSocket(socket);
    if(loginState){
      socket.on("connect", () => {
        console.log(socket.id);
      });
      socket.on("chat message", (message) => {
        console.log("chat message",message);
      });
      socket.on('join_user',(online_users)=>{
        console.log(online_users)
      });
      socket.on("recived message", (message) => {
        setOldMessages((old)=>[...old,{id:socket.id,message}]);
  
      });
      socket.on("connect_error", (err) => {
        toast.error(err.message);
        navigate("/login");
      });
    }else{
      toast.error("Please login first");
      navigate("/login");
    }
    
    return () => {
      socket.emit("offline",loginUser);
      socket.disconnect(); 
    };
  }, []);
  console.log(oldMessages);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(message.length>0){
      socket.emit('chat message', message);
      setMessage('');
    }
    
  };
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{'height':'100vh'}}>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{'height':'300px','width':'200px','overflowY':'scroll'}}>
        {
          oldMessages.map((data,index)=>(
            <span key={index}>{data.message}</span>
          ))
        }
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
