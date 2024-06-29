
import axios from 'axios';
import React,{useState} from 'react'
import JSEncrypt from 'jsencrypt';

const Test=() =>{
    const token=localStorage.getItem('token');
    const [message,setMessage]=useState("");
    const SubmitEvent=()=>{
      const jsEncrypt = new JSEncrypt();
      const publicKey=process.env.REACT_APP_PUBLIC_KEY.replace(/\\n/g, '\n');
    // const publicKey="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvuMqA3tL2BTOThfoevTq\n1ChnqbwxQFoVRckOp/OzshdwPPIIsP+9MHp1AdXs037wzdLKqxourUXueVsl/Ecb\nLuxRZgDPuyzq0ZAlYvD1hE0rlfm1oAEWSNby02ssxQz/bM/2j0Vln3SOu+XkDOLu\nAvx7KbPlFMpr6btvDYzkxY8pgWHlNKyPrR1kVvJjxXIpbwR5n95xVHeWQIIk99Wj\nBHYBYmFI9rQb87cbMiGwtUo6tRE/z5b+uS6Ke02e2flsBLy96iL1hEjRyNhZbLyY\nBlgQwoM7fZJLEVcD46rNRpt8aUFzR9Afe6RKTQ2XqiI5x8dA89y+0g6wRjAqFS3v\n+wIDAQAB\n-----END PUBLIC KEY-----\n";
      console.log(publicKey);
      console.log(jsEncrypt);
      jsEncrypt.setPublicKey(publicKey);
      console.log(jsEncrypt);
      const encryptedData = jsEncrypt.encrypt(JSON.stringify({
        friend_id:"65e33c56ca2a3030c32a766a",
        handle:"rejected"
        }));
      console.log(encryptedData);
      axios.post("http://localhost:5000/auth/handle-friend-request",{request:encryptedData},
      {
        headers: {
            'Authorization': `Bearer ${token}`
          }
      },
      ).then((res)=>{
        console.log(res);
      })
    }
  return (
    <>
    <div>test</div>
    <input type="text" name="test" value={message} onChange={(e)=>setMessage(e.target.value)}/>
    <button onClick={SubmitEvent}>test</button>
    </>
  )
}

export default Test;