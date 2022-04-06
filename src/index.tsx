import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DefineProperty } from '@/Utils'
import AppContainer from '@/App'
import WebVitals from '@/reportWebVitals'
import '@Styles/main.scss'

DefineProperty()

// Create React App.
const rootElement = document.getElementById('app')!
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <AppContainer />
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
WebVitals()
