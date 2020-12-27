import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searching: false,
  stars: 0,
  term: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch () {
      return initialState
    },
    setSearching (state, action) {
      const searching = action.payload
      state.searching = searching
    },
    setStars (state, action) {
      const stars = action.payload
      state.stars = stars
    },
    setTerm (state, action) {
      const term = action.payload
      state.term = term
    }
  }
})

export const { resetSearch, setSearching, setStars, setTerm } = searchSlice.actions

export default searchSlice.reducer
