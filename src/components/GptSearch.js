import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggest from './GptMovieSuggest'
import { BG_URL } from '../utils/constants'
import Header from './Header'  // Make sure to import the Header component

const GptSearch = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BG_URL})`,
        }}
      ></div>
      <div className="relative flex-grow overflow-auto">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow p-8">
            <div className="max-w-screen-md mx-auto">
              <GptSearchBar />
              <GptMovieSuggest />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GptSearch