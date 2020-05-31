import en from 'javascript-time-ago/locale/en'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TimeAgo from 'javascript-time-ago'
import { Descriptions, Rate, Space, Typography } from 'antd'
import { useHistory } from 'react-router-dom'

import { Spinner } from 'lightflick/components'
import { useApi } from 'lightflick/hooks'

const Movie = styled.div`
  background-color: white;
  display: flex;
  padding: 20px;
`

const Overview = styled.div`
  margin: 12px 0;
`

const Poster = styled.div`
  background-color: black;
  padding: 1px;
  width: 302px;
`

const Right = styled.div`
  margin-left: 20px;
`

const Title = styled.div`
  display: flex;
`

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const Details = ({ id }) => {
  const api = useApi()
  const history = useHistory()

  const [movie, setMovie] = useState()
  const [profit, setProfit] = useState()

  useEffect(() => {
    const fetch = async () => {
      const movie = await api.get(id)
      if (movie) {
        setMovie(movie)
      } else {
        history.push(`/movies`)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    if (movie && movie.budget > 0 && movie.revenue > 0) {
      setProfit(movie.revenue - movie.budget)
    }
  }, [movie])

  return movie ? (
    <Movie>
      <div>
        {(movie.poster_path || movie.backdrop_path) && (
          <Poster>
            <img
              src={`http://image.tmdb.org/t/p/w185/${movie.poster_path ||
                movie.backdrop_path}`}
              style={{ width: 300 }}
            />
          </Poster>
        )}
      </div>
      <Right>
        <Title>
          <Space align='center' size='middle'>
            <Typography.Title style={{ margin: 0 }}>
              {movie.title}
            </Typography.Title>
            {movie.vote_average && (
              <Rate
                allowHalf
                defaultValue={Math.round(movie.vote_average) / 2}
                disabled
              />
            )}
          </Space>
        </Title>
        {movie.tagline && (
          <Typography.Title level={4} style={{ margin: 0 }}>
            {movie.tagline}
          </Typography.Title>
        )}
        {movie.overview && (
          <Overview>
            <Typography.Text>{movie.overview}</Typography.Text>
          </Overview>
        )}
        {profit && (
          <Descriptions bordered size='small'>
            <Descriptions.Item label='Budget'>{`$${new Intl.NumberFormat().format(
              movie.budget
            )}`}</Descriptions.Item>
            <Descriptions.Item label='Revenue'>{`$${new Intl.NumberFormat().format(
              movie.revenue
            )}`}</Descriptions.Item>
            <Descriptions.Item label='Profit'>
              {profit > 0 ? (
                <Typography.Text>{`$${new Intl.NumberFormat().format(
                  profit
                )}`}</Typography.Text>
              ) : (
                <Typography.Text type='danger'>{`$${new Intl.NumberFormat().format(
                  profit
                )}`}</Typography.Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
        <p style={{ margin: '10px 0 0 0' }}>
          Released {timeAgo.format(new Date(movie.release_date))}
        </p>
        <Space>
          {movie.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}/`}
              rel='noopener noreferrer'
              target='_blank'
            >
              See on IMDb
            </a>
          )}
          {movie.homepage && (
            <a href={movie.homepage} rel='noopener noreferrer' target='_blank'>
              Visit homepage
            </a>
          )}
        </Space>
      </Right>
    </Movie>
  ) : (
    <Spinner />
  )
}

export default Details
