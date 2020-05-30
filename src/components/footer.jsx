import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const Footer = () => {
  const theme = useContext(ThemeContext)

  return (
    <p style={{ color: theme.footer.color, margin: 0 }}>
      Lightflick ©2020 by Luciano Ropero
    </p>
  )
}

export default Footer
