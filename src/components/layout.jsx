import React, { useContext } from 'react'
import { Layout as L } from 'antd'
import { ThemeContext } from 'styled-components'

import { Footer, Nav } from 'lightflick/components'

const Layout = ({ children, search, searching }) => {
  const theme = useContext(ThemeContext)

  return (
    <L>
      <L.Header
        style={{
          backgroundColor: theme.header.backgroundColor,
          boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2)',
          position: 'fixed',
          width: '100%',
          zIndex: 1
        }}
      >
        <Nav search={search} searching={searching} />
      </L.Header>
      <L.Content style={{ marginTop: 64 }}>{children}</L.Content>
      <L.Footer
        style={{
          backgroundColor: theme.footer.backgroundColor,
          bottom: 0,
          position: 'fixed',
          textAlign: 'center',
          width: '100%',
          zIndex: 1
        }}
      >
        <Footer />
      </L.Footer>
    </L>
  )
}

export default Layout
