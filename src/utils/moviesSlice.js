import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlaying: null,
        popularMovies: null,
        trailerVideo: null
    },
    reducers: {
        addNowPlaying: (state, action) =>{
            state.nowPlaying = action.payload;
        },
        addPopularMovies: (state, action) =>{
            state.popularMovies = action.payload;
        },
        addTopRated: (state, action) => {
            state.topRated = action.payload;
        },
        addUpcoming: (state, action) => {
            state.upcoming = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        }
    }
});

export const { addNowPlaying, addTrailerVideo, addPopularMovies, addTopRated, addUpcoming } = movieSlice.actions;
export default movieSlice.reducer;
