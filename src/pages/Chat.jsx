import React, { useState, useEffect, useContext,useRef } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, clearMessage } from "../redux/user/messaging";
import { SocketContext } from "../SocketProvider";
import oldMessageHandler from "../helper/oldMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
    return () => {
      dispatch(clearMessage());
      // socket.emit("offline",{user_id: user._id,socket_id:socket.id});
      // socket.disconnect();
    };
  }, [socket]);


  useEffect(() => {
    scrollToBottom();
  }, [messageState.message]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };
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
          className="container p-2"
          style={{ 'height': "60vh",'width':'inherit', "overflow-y": "scroll" }}
        >
          {messageState.messageExist
            ? messageState.message.map((message, index) => {
                return (
                  <div
                    className="row p-2 d-flex flex-column "
                    key={index}
                    style={{'height': "auto",'width': "inherit"}}
                  >
                    <div className={ message.sender?"col-10 align-self-end":"col-10 align-self-start"} style={{"background-color": message.sender?"green":"gray" ,'padding': "10px",'border-radius': "10px", 'color': "white"}}>
                        <span className="d-flex flex-column" style={{'width': "inherit",'text-align': "left"}}>
                        <p style={{'font-weight':"500",'height':'auto'}}> {message?.sender_name} </p>
                        <p style={{'font-weight':"400",'height':'auto'}}>{message.message}</p>
                        </span>
                        
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="container p-2" style={{"margin-top": "10px","width": "inherit","background-color": "#1b147d",'color': "white",'border-radius': "20px"}}>
          <form className="row d-flex flex-row" style={{  "width": "inherit" }} onSubmit={handleOnSubmit}>
            <div className="col-11" >
              <label htmlFor="chatInput" className="visually-hidden">
                Your message
              </label>
              <textarea
                className="form-control"
                id="chatInput"
                placeholder="Your Message .."
                style={{ "height": "100%",'width': "100%",'border-radius': "17px",'background-color': "transparent",'color': "white",'border': "none",'overflow':'hidden', 'resize': 'none'}}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
            </div>
            <div className="col-1 align-content-center" style={{ "height": "inherit"}}>
              <button type="submit" className="btn" style={{'height': "inherit"}}>
              <FontAwesomeIcon icon={faPaperPlane} style={{'height': "25px",'color': "white"}} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
