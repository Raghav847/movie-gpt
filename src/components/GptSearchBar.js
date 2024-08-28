import React, { useRef, useState } from 'react'
import languageConstants from '../utils/LanguageConstants'
import { useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { useDispatch } from 'react-redux';

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const searchMoviesTMDB = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS)

        
        const json = await data.json();
        return json.results;
    };
    

    const handleGptSearchClick = async () => {
        setError(null); // Clear any previous errors
        setIsLoading(true); // Set loading to true when search starts
        console.log(searchText.current.value);
        const gptQuery = `Act as a Movie Recommendation System and suggest some movies for the query: ${searchText.current.value}. Only return 5 movies, comma separated.`;
        
        try {
            const gptResult = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: gptQuery}],
            });
            console.log(gptResult.choices?.[0]?.message?.content);
            const gptMovies = gptResult.choices?.[0]?.message?.content.split(",");
            const data = gptMovies.map(movie => searchMoviesTMDB(movie));
            const dataResults = await Promise.all(data);
            console.log(dataResults);
            dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: dataResults}));

        } catch (error) {
            console.error("Error fetching GPT recommendations:", error);
            setError(languageConstants[langKey].gptSearchError);
        } finally {
            setIsLoading(false); // Set loading to false when search completes or fails
        }
    };

    return (
        <div className='pt-[35%] flex justify-center px-4 '> 
             
                <form className='bg-black w-full grid grid-cols-12 rounded-lg' onSubmit={(e) => e.preventDefault()}>
                    <input 
                        ref={searchText} 
                        type='text' 
                        placeholder={languageConstants[langKey].gptSearchPlaceholder} 
                        className=' p-4 m-4 col-span-9'
                        disabled={isLoading} // Disable input while loading
                    />
                    <button 
                        className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
                        onClick={handleGptSearchClick}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : (
                            languageConstants[langKey].search
                        )}
                    </button>
                </form>
                {isLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-b-4 border-white"></div>
                    </div>
                )}
                {error && <div className='text-red-500 mt-2 text-center text-sm sm:text-base'>{error}</div>}
            </div>
       
    )
}

export default GptSearchBar