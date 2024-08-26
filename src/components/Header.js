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
    <div className='absolute w-full px-4 py-2 bg-black z-10 flex flex-col md:flex-row justify-between items-center -top-2'>
      <img
        className='w-20 md:w-24 mx-auto md:mx-0'
        src={LOGO}
        alt='logo'
      />
      <div className='flex items-center space-x-2'>
        {showGptSearch && <select className='text-white bg-gray-800 p-2 rounded-lg' onChange={ handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((language) => (
            <option key={language.identifier} value={language.identifier}>{language.name}</option>
          ))}
        </select>}
        <button className='py-1 px-3 text-sm bg-purple-800 text-white rounded-lg'
        onClick={handleGptSearchClick}
        >
           {!showGptSearch ? "GPT Search" : "Home"}
          </button>
        {user && (
          <div className='flex items-center space-x-2'>
            <img
              className='w-6 h-6 md:w-8 md:h-8 rounded-full'
              alt='usericon'
              src={user?.photoURL}
            />
            <button 
              onClick={handleSignOut} 
              className='px-3 py-1 text-xs md:text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300 shadow-md'
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