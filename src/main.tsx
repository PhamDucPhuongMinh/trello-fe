import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import theme from './theme'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            allowClose: false,
            confirmationButtonProps: { color: 'primary', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' }
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-left" theme="colored" />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
