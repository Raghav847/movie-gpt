import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlaying } from '../utils/moviesSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useNowPlaying = () => {
    const dispatch = useDispatch();
    const nowPlaying = useSelector(store => store.movies.nowPlaying);


  const getNowPlaying = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlaying(json.results));
  };

  useEffect(() => {
    if (!nowPlaying) getNowPlaying();
  },[])
}

export default useNowPlaying;