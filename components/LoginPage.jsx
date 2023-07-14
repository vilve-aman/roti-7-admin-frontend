"use client"
// import { RouteContext } from "@/context/routeContext";
import { AppContext } from "@/context/AppContext.js";
import Image from "next/image";
import { useContext, useState } from "react";
import { redirect } from 'next/navigation'
import useLocalStorage from "use-local-storage";

import React from 'react'
import { adminlogin } from "@/admin-scripts/api";

const LoginPage = () => {

  const { appData, setData } = useContext(AppContext);
  // const [token, settoken] = useLocalStorage("token");
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [Error, setError] = useState(false)

  const submitHandler = () => {
    
    adminlogin(Username, Password)
    .then((r)=> setData(r))
    .catch((err)=> console.log(err))
    
  }

  // setData({login: 'user'})
  if (appData) {
    redirect('/')
  }

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>

        <div className="w-full h-fit flex justify-center">
          <Image src={'/sandwich.png'} width={120} height={120} alt="base img"/>
        </div>
        <form onSubmit={(event)=>{event.preventDefault()}}>
          <div className="user-box">
            <input type="text" name="" required="" onChange={(event) => setUsername(event.target.value)}/>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required="" onChange={(event) => setPassword(event.target.value)}/>
            <label>Password</label>
          </div>

          {Error ? <span className="text-red-500">this is sample error</span>: ""}
        <br/>
          <a className="cursor-pointer" onClick={()=>{submitHandler()}} >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
  
        


      </div>
    </>
  )
}

export default LoginPage