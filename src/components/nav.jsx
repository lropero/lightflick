import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Rate, Space } from 'antd'

import Logo from 'lightflick/assets/logo.svg' // created with https://app.brandmark.io/v2/

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

const Nav = ({ search, searching }) => {
  const [stars, setStars] = useState(0)
  const [term, setTerm] = useState('')

  useEffect(() => {
    search({ stars, term })
  }, [stars, term])

  const handleRateChange = value => {
    setStars(value)
  }

  const handleSearchChange = value => {
    setTerm(value)
  }

  return (
    <Wrapper>
      <Logo style={{ left: -72, position: 'relative', top: -88 }} />
      <Search>
        <Space align='center' size='middle'>
          <Rate allowClear onChange={handleRateChange} />
          <Input.Search
            allowClear
            loading={searching}
            onChange={event => handleSearchChange(event.currentTarget.value)}
            placeholder='Search'
            style={{ width: 300 }}
          />
        </Space>
      </Search>
    </Wrapper>
  )
}
export default Nav
