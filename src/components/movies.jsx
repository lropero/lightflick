import React, { useState } from 'react'
import styled from 'styled-components'
import { debounce, pick } from 'lodash'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Details, Layout, List } from 'lightflick/components'
import { filterMovies } from 'lightflick/helpers'
import { updateCache } from 'lightflick/store/cache'
import { updateMovies } from 'lightflick/store/movies'
import { useApi } from 'lightflick/hooks'

const indicator = <LoadingOutlined style={{ fontSize: 50 }} spin />

const Wrapper = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 30px;
`

const Movies = () => {
  const api = useApi()
  const cacheStore = useSelector(state => state.cache)
  const dispatch = useDispatch()
  const moviesStore = useSelector(state => state.movies)
  const { id } = useParams()

  const [movies, setMovies] = useState()
  const [searching, setSearching] = useState(false)

  const fetch = debounce(async ({ term, stars }) => {
    const movies = term.length ? await api.search(term) : await api.popular()
    dispatch(updateMovies(movies))
    dispatch(updateCache({ term, movieIds: movies.map(movie => movie.id) }))
    setMovies(filterMovies({ movies, stars }))
    setSearching(false)
  }, 300)

  const search = ({ stars, term }) => {
    if (cacheStore[term]) {
      setMovies(
        filterMovies({
          movies: Object.values(pick(moviesStore, cacheStore[term])),
          stars
        })
      )
    } else {
      setSearching(term.length >= 3)
      fetch({ term, stars })
    }
  }

  return (
    <Layout search={search} searching={searching}>
      {id ? (
        <Details id={id} />
      ) : !Array.isArray(movies) || searching ? (
        <Wrapper>
          <Spin indicator={indicator} />
        </Wrapper>
      ) : (
        <List movies={movies} />
      )}
    </Layout>
  )
}

export default Movies
