import React, { useEffect } from 'react'
import { useNavigate,NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlist } from '../redux/user/alluser';

const Allusers=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const users=useSelector((state)=>state.userlist.users);
    useEffect(()=>{
        dispatch(userlist());
    },[])
  return (
    <>
    friends.forEach((element)=>{
        <div className="col-auto">
            elelement.name
        </div>
    });
    </>
    )
}

export default Allusers;