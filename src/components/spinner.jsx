import React from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const indicator = <LoadingOutlined style={{ fontSize: 50 }} spin />

const Wrapper = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 30px;
`

const Spinner = () => (
  <Wrapper>
    <Spin indicator={indicator} />
  </Wrapper>
)

export default Spinner
