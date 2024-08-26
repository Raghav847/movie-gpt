import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import { motion } from 'framer-motion';

const MovieCard = ({posterPath}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-48 pr-4'
    >
        <img alt='Movie Card' src={IMG_CDN_URL + posterPath}></img>
    </motion.div>
  )
}

export default MovieCard