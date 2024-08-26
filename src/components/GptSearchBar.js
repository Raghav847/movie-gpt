import React from 'react'
import languageConstants from '../utils/LanguageConstants'
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className=' w-1/2 mx-auto bg-black grid grid-cols-12'>
            <input type='text' placeholder={languageConstants[langKey].gptSearchPlaceholder} className='p-4 m-4 col-span-9' />
            <button className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4'>
                {languageConstants[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar