import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    trello: {
      appBarHeight: string
      boardBarHeight: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    trello?: {
      appBarHeight?: string
      boardBarHeight?: string
    }
  }
}

const theme = createTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    dark: true
  }
})

export default theme
