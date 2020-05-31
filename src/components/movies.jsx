import React, { useEffect, useState } from 'react'
import { debounce, pick } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Details, Layout, List, Spinner } from 'lightflick/components'
import { filterMovies } from 'lightflick/helpers'
import { setSearching } from 'lightflick/store/search'
import { updateCache } from 'lightflick/store/cache'
import { updateMovies } from 'lightflick/store/movies'
import { useApi } from 'lightflick/hooks'

const Movies = () => {
  const cacheStore = useSelector(state => state.cache)
  const moviesStore = useSelector(state => state.movies)
  const { searching, stars, term } = useSelector(state => state.search)

  const api = useApi()
  const dispatch = useDispatch()
  const { id } = useParams()

  const [movies, setMovies] = useState()

  const fetch = debounce(async ({ term, stars }) => {
    const movies = term.length ? await api.search(term) : await api.popular()
    dispatch(updateMovies(movies))
    dispatch(updateCache({ term, movieIds: movies.map(movie => movie.id) }))
    setMovies(filterMovies({ movies, stars }))
    dispatch(setSearching(false))
  }, 300)

  useEffect(() => {
    if (cacheStore[term]) {
      setMovies(
        filterMovies({
          movies: Object.values(pick(moviesStore, cacheStore[term])),
          stars
        })
      )
    } else if (term.length === 0 || term.length >= 3) {
      dispatch(setSearching(true))
      fetch({ term, stars })
    }
  }, [stars, term])

  return (
    <Layout>
      {id ? (
        <Details id={id} />
      ) : !Array.isArray(movies) || searching ? (
        <Spinner />
      ) : (
        <List movies={movies} />
      )}
    </Layout>
  )
}

export default Movies
