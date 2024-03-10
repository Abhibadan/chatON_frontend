import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Login = () => {
  const [message, setMessage] = useState("");
  const [oldMessages,setOldMessages]=useState([]);
  const socket = io("http://192.168.1.4:5050");

  useEffect(() => {
    
    socket.on("connect", () => {
      console.log(socket);
    });
    socket.on("chat message", (message) => {
      console.log("chat message",message);
    });
    socket.on("recived message", (message) => {
      setOldMessages((old)=>[...old,{id:socket.id,message}]);

    });
    return () => {
      socket.disconnect(); 
    };
  }, []);
  console.log(oldMessages);
  const handleOnChat = (e) => {
    console.log(message);
    socket.emit('chat message', message);
  };
  return (
    <>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />{" "}
      <button type="button" onClick={handleOnChat}>
        send
      </button>
    </>
  );
};
export default Login;
