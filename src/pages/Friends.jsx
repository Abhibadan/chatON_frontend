import React, { useEffect } from 'react'
import { useNavigate,NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { friend } from '../redux/user/friends';

const Friends=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const friends=useSelector((state)=>state.friends.friendlist);
    useEffect(()=>{
        dispatch(friend());
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

export default Friends;