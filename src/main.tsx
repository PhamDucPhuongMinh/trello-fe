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
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { injectAxiosDispatchReduxStore } from './utils/axiosInstance.ts'

const persistor = persistStore(store)

injectAxiosDispatchReduxStore(store.dispatch)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
