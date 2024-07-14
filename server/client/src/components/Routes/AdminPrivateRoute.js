import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
export default function AdminPrivateRoute(){
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect( ()=>{
        const autoCheck=async()=>{
            const res=await axios.get('/api/v1/auth/admin-auth')
            if(res.data.ok)
            {
                setOk(true)
            }
            else{
                setOk(false)
            }
            // console.log(res.data.ok);
        }
        if(auth?.token) autoCheck();

    },[auth?.token])

    return ok?<Outlet />:<Spinner path=""/>
}