import React from 'react'

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='fixed w-full px-4 py-2 bg-black z-10 flex flex-col sm:flex-row justify-between items-center'>
      <img
        className='w-24 mx-auto sm:mx-0 mb-2 sm:mb-0'
        src={LOGO}
        alt='logo'
      />
      <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2'>
        {showGptSearch && (
          <select 
            className='text-white bg-gray-800 p-2 rounded-lg text-sm'
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((language) => (
              <option key={language.identifier} value={language.identifier}>
                {language.name}
              </option>
            ))}
          </select>
        )}
        <button 
          className='py-1 px-3 text-sm bg-purple-800 text-white rounded-lg w-full sm:w-auto'
          onClick={handleGptSearchClick}
        >
          {!showGptSearch ? "GPT Search" : "Home"}
        </button>
        {user && (
          <div className='flex items-center space-x-2 mt-2 sm:mt-0'>
            <img
              className='w-8 h-8 rounded-full'
              alt='usericon'
              src={user?.photoURL}
            />
            <button 
              onClick={handleSignOut} 
              className='px-3 py-1 text-xs sm:text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300 shadow-md'
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