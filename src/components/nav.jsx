import React from 'react'
import styled from 'styled-components'
import { Input, Rate } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Logo from 'lightflick/assets/logo.svg' // created with https://app.brandmark.io/v2/
import { resetSearch, setStars, setTerm } from 'lightflick/store/search'

const Search = styled.div`
  align-items: center;
  align-self: center;
  display: flex;

  > ul {
    margin-right: 16px;
  }
`

const Wrapper = styled.div`
  display: flex;
  height: 64px;
  justify-content: space-between;
`

const Nav = () => {
  const { searching, stars, term } = useSelector(state => state.search)

  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogoClick = () => {
    dispatch(resetSearch())
    history.push('/')
  }

  const handleRateChange = value => {
    dispatch(setStars(value))
  }

  const handleSearchChange = event => {
    const term = event.currentTarget.value
    dispatch(setTerm(term))
  }

  return (
    <Wrapper>
      <Logo onClick={handleLogoClick} style={{ cursor: 'pointer', left: -72, position: 'relative', top: -88 }} />
      {!id && (
        <Search>
          <Rate allowClear defaultValue={stars} onChange={handleRateChange} />
          <Input.Search allowClear loading={searching} onChange={handleSearchChange} placeholder='Search' style={{ width: 300 }} value={term} />
        </Search>
      )}
    </Wrapper>
  )
}
export default Nav
