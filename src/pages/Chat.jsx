import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, clearMessage } from "../redux/user/messaging";
import { SocketContext } from "../SocketProvider";
import oldMessageHandler from "../helper/oldMessage";
import { useRef } from "react";
const Chat = () => {
  const { socket, setSocket } = useContext(SocketContext);
  const { state } = useLocation();
  const chatRef=useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const messageState = useSelector((state) => state.messaging);
  
  const [message, setMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("Auth")) || false;
  const auth_check = user?._id && localStorage.hasOwnProperty("token");
  useEffect(() => {
    dispatch(clearMessage());
    if (user?._id && localStorage.hasOwnProperty("token")) {
      console.log("chat",socket);
      if (socket != null && socket != undefined) {
        socket.on("chat message", () => {
          console.log("chat message");
        });
        socket.on("join_user", (online_users) => {
          console.log(online_users);
        });
        socket.on("recived message", (message) => {
          console.warn("message", message);
          dispatch(addNewMessage(message));
        });

        socket.on("connect_error", (err) => {
          toast.error(err.message);
          localStorage.removeItem("token");
          localStorage.removeItem("Auth");
          navigate("/login");
        });
      }
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
    oldMessageHandler(dispatch, user?._id, state.user_id);
    // console.log(chatRef.current);
    return () => {
      console.log("unmount CHAT");
      dispatch(clearMessage());
      // socket.emit("offline",{user_id: user._id,socket_id:socket.id});
      // socket.disconnect();
    };
  }, [socket]);
  // console.log(oldMessages);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket.emit("chat message", {
        message,
        sender: user?._id,
        receiver: state.user_id,
      });
      dispatch(addNewMessage({ message, sender: true,sender_name:user?.first_name+" "+user?.last_name}));
      setMessage("");
    }
  };
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ 'position': "relative", 'height': "100vh"}}>
        <div
          ref={chatRef}
          className="row"
          style={{ 'height': "60vh",'width':'inherit', "overflow-y": "scroll" }}
        >
          {messageState.messageExist
            ? messageState.message.map((message, index) => {
                return (
                  <div
                    className="row g-3 d-flex align-items-center flex-column"
                    key={index}
                  >
                    <div className="col-10">
                      <span
                        className="badge bg-secondary"
                        style={
                          message.sender
                            ? { "background-color": "green" }
                            : { "background-color": "blue" }
                        }
                      >
                        {message?.sender_name}
                        {message.message}
                      </span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="row m-20 p-2 d-flex flex-column" style={{ "background-color": "blue"}}>
          <form className="form-container" onSubmit={handleOnSubmit}>
            <div className="col-auto">
              <label htmlFor="chatInput" className="visually-hidden">
                Your message
              </label>
              <textarea
                className="form-control"
                id="chatInput"
                placeholder="Your Message .."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
