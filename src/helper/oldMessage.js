import { addOldMessage } from "../redux/user/messaging";
const oldMessageHandler=(dispatch,sender,reciver)=>{
    const eventSource = new EventSource(`${process.env.REACT_APP_BACKEND}/old-message/${sender}/${reciver}`);
    eventSource.onmessage = (e) => {
        dispatch(addOldMessage(JSON.parse(e.data)));
        // return e.data;
    };

}

export default oldMessageHandler;