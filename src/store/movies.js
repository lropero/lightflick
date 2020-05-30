import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {},
  reducers: {
    updateMovies (state, action) {
      const movies = action.payload
      return Object.assign(
        {},
        state,
        movies.reduce((movies, movie) => {
          movies[movie.id] = movie
          return movies
        }, {})
      )
    }
  }
})

export const { updateMovies } = moviesSlice.actions

export default moviesSlice.reducer
