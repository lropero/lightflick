import { configureStore } from '@reduxjs/toolkit'

import cache from './cache'
import movies from './movies'

const store = configureStore({
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  reducer: { cache, movies }
})

export default store
