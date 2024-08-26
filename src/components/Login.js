import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';



const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  
  const handleButtononClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);

    if(message) return;

    if(!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: USER_AVATAR,
        
          })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                    uid: uid, 
                    email: email, 
                    displayName: displayName, 
                    photoURL: photoURL,
                })
            );
            //navigate("/browse");
          })
          .catch((error) => {
            seterrorMessage(error.message);
          });
          
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + " - " + errorMessage);
        });

    } else {
      //Sign In
      signInWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          //navigate("/browse")
         
       })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMessage(errorCode+"-"+errorMessage);
      });
    }

  }
  
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
        <Header />
        <div className=' absolute '>
            <img
            src='https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg'
            //src='https://images.squarespace-cdn.com/content/v1/5bfff88170e802806d993220/1581813522353-ECNGCE7YZQSOJD6LBHQF/image-asset.png?format=1000w'
            alt='background'></img>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className=' w-3/12 fixed p-12 bg-black m-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='sticky font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (
            <input
            ref={name}
             type='text' 
             placeholder='Full Name' 
             className='p-4 my-4 w-full bg-gray-800'
             />
              )}
            <input
            ref={email} 
            type='text' 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-800'
            />
            
            <input
            ref={password} 
            type='password' 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-800'
            />
            <p className='text-red-500 font-bold text-lg p-2'>{errorMessage}</p>
            <button 
            className='p-4 my-6 bg-red-700 hover:bg-red-800 shadow-lg shadow-red-700/50 w-full rounded-lg' onClick={handleButtononClick}>
              {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New here? Sign Up" : "Already registered? Sign In"}</p>
           
        </form>
    </div>
  )
};
export default Login;
