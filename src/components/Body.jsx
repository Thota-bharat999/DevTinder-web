import React, { useEffect } from 'react'
import { Outlet, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addUser} from '../utilis/userSlice'
import {BASE_URL} from '../utilis/constants'

export const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.user)

  const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "/profile/view", {
     withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
  },
    });
    dispatch(addUser(res.data));
  } catch (err) {
    if (err.response?.status === 401) {
      navigate("/login");
    }
    console.error(err);
  }
};
  useEffect(()=>{
    if(!userData){
      fetchUser()
    }
   
  },[]);
  return (
    <div>
   <NavBar/>
   <Outlet/>
   <Footer/>
  
   </div>
  )
}
