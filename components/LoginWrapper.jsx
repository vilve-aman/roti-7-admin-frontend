'use client';
import { redirect } from 'next/navigation'
import React, {useState, useContext} from 'react'
// import useLocalStorage from "use-local-storage";
import { AppContext } from '@/context/AppContext';

function LoginWrapper() {

  const { appData, setData } = useContext(AppContext);


    appData ? 
    redirect('/home')
    :
    redirect('/login')

  return (

    <div>LoginWrapper</div>
  )
}

export default LoginWrapper