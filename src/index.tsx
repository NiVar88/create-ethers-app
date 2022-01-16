import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { defineProperty, getLibrary } from '@/utils'
import store from '@/store'
import AppContainer from '@/App'
import reportWebVitals from '@/reportWebVitals'
import '@styles/main.scss'

// Define Array Property.
defineProperty()

// Create React App.
render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('app')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
