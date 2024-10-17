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
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    dark: true
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.main',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-:hover': {
            backgroundColor: 'primary.light'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          color: theme.palette.primary.main,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          }
        })
      }
    }
  }
})

export default theme
