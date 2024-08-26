import React from 'react'

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      //navigate("/")
    })
    .catch((error) => {
      navigate("/error");
    });
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
                uid: uid, 
                email: email, 
                displayName: displayName, 
                photoURL: photoURL,
            })
        );
         navigate("/browse")
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
          
        }
      });
      //Unsubscribe when the component unmounts
      return () => unsubscribe();
}, []);
  return (
    <div className='w-full px-4 py-1 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center'>
        <img
        className='w-24 md:w-32 mx-auto md:mx-0'
        src={LOGO}
        alt='logo'/>
        <div className='flex flex-col items-center md:flex-row md:space-x-4'>
          <p className='text-yellow-300 text-sm mb-2 md:mb-0 font-bold italic tracking-wide border-b border-white pb-1 md:pb-0 md:border-b-0'>
            Scroll down for more movie details
          </p>
          {user && (
          <div className='flex items-center space-x-4'>
            <img
            className='w-8 h-8 md:w-10 md:h-10 rounded-full'
            alt='usericon'
            src= {user?.photoURL}
            />
            <button 
              onClick={handleSignOut} 
              className='px-4 py-2 text-sm md:text-base font-bold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300 shadow-md'
            >
              Sign Out
            </button>
          </div>
          )}
        </div>
    </div>
  )
}

export default Header