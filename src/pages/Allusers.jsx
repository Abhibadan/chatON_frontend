import React, { useEffect } from 'react'
import { useNavigate,NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlist } from '../redux/user/alluser';

const Allusers=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const users=useSelector((state)=>state?.userlist);
    useEffect(()=>{
        dispatch(userlist());
    },[])
  return (
    <>
     {
        !users.userRequest && !users.userError?
        users.userlist.map((user)=>(
            <div id={user._id} className="col-auto">
                <NavLink to="/chat" className="nav-link" activeClassName="active" onClick={(e)=>{
                    e.preventDefault();
                    navigate('/chat',{state:{user_id:user._id}});
                }}>{user?.first_name} {user?.last_name} {user?.email}</NavLink>
            </div>
        )):null
     }
    </>
    )
}

export default Allusers;