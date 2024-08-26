import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggest from './GptMovieSuggest'
import { BG_URL_Blur } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className=' absolute -z-10 '>
            <img
            //src='https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg'
            //src='https://images.squarespace-cdn.com/content/v1/5bfff88170e802806d993220/1581813522353-ECNGCE7YZQSOJD6LBHQF/image-asset.png?format=1000w'
            src={BG_URL_Blur}
            alt='background'></img>
        </div>
      <GptSearchBar />
      <GptMovieSuggest />
    </div>
  )
}

export default GptSearch