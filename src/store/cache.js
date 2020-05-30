import { createSlice } from '@reduxjs/toolkit'

const cacheSlice = createSlice({
  name: 'cache',
  initialState: {},
  reducers: {
    updateCache (state, action) {
      const { term, movieIds } = action.payload
      state[term.length ? term : '#'] = movieIds
    }
  }
})

export const { updateCache } = cacheSlice.actions

export default cacheSlice.reducer
