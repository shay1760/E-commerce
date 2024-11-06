import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState]=useState('Login');
  const {token, setToken, navigate, backendUrl}=useContext(ShopContext)
  
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [mobile, setMobile]=useState('')
  const [password, setPassword]=useState('')
  
  const onSubmitHandler=async(event)=>{
    event.preventDefault();

    try {
      if(currentState==='Sign up')
      {
        const response=await axios.post(backendUrl+'/api/v1/user/register', {name, email, phone: mobile, password});
        if(response.data.success)
        {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendUrl+'/api/v1/user/login', {email, password})
        if(response.data.success)
        {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:maxw-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] bg-gray-800' />
      </div>
      {currentState==='Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} className='w-3/5 px-3 py-2 border border-gray-800' type="text" placeholder='Name' required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-3/5 px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
      {currentState==='Login' ? '' : <input onChange={(e)=>setMobile(e.target.value)} value={mobile} className='w-3/5 px-3 py-2 border border-gray-800' type="text" placeholder='Mobile number' />}
      <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='w-3/5 px-3 py-2 border border-gray-800' type="password" placeholder='Password' required />

      <div className='w-3/5 flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot password</p>
        {
          currentState==='Login' ? 
          <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login</p>
        }
      </div>
      <button className='bg-black text-white px-8 py-2 mt-4'>{currentState==='Login' ? 'Sign in' : 'Sign up'}</button>
    </form>
  )
}

export default Login
