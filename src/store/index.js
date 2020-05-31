import { configureStore } from '@reduxjs/toolkit'

import cache from './cache'
import movies from './movies'
import search from './search'

const store = configureStore({
  devTools: true, // !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  reducer: { cache, movies, search }
})

export default store
