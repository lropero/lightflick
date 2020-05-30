import React from 'react'
import styled from 'styled-components'
import { Input, Rate, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Logo from 'lightflick/assets/logo.svg' // created with https://app.brandmark.io/v2/
import { setStars, setTerm } from 'lightflick/store/search'

const Search = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
`

const Wrapper = styled.div`
  display: flex;
  height: 64px;
  justify-content: space-between;
`

const Nav = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { searching, stars, term } = useSelector(state => state.search)

  const handleRateChange = value => {
    dispatch(setStars(value))
  }

  const handleSearchChange = event => {
    const term = event.currentTarget.value
    dispatch(setTerm(term))
  }

  return (
    <Wrapper>
      <Logo style={{ left: -72, position: 'relative', top: -88 }} />
      {!id && (
        <Search>
          <Space align='center' size='middle'>
            <Rate allowClear defaultValue={stars} onChange={handleRateChange} />
            <Input.Search
              allowClear
              loading={searching}
              onChange={handleSearchChange}
              placeholder='Search'
              style={{ width: 300 }}
              value={term}
            />
          </Space>
        </Search>
      )}
    </Wrapper>
  )
}
export default Nav
