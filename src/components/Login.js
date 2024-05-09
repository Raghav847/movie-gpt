import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img
            src='https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg'
            alt='background'></img>
        </div>
        <form className=' w-3/12 fixed p-12 bg-black m-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='sticky font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (
            <input
             type='text' 
             placeholder='Full Name' 
             className='p-4 my-4 w-full bg-gray-800'
             />
              )}
            <input 
            type='text' 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-800'
            />
            
            <input 
            type='password' 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-800'
            />
            <button 
            className='p-4 my-6 bg-red-700 hover:bg-red-800 shadow-lg shadow-red-700/50 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up" : "Already registered? Sign In"}</p>
           
        </form>
    </div>
  )
};
export default Login;
