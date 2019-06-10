import './App.css'
import './assets/scss/livepeer.css?v=1.4.0'
import * as serviceWorker from './serviceWorker'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactGA from 'react-ga'
import logdown from 'logdown'
import { AXIOS_BASE_URL, GOOGLE_ANALYTICS_URL, LOGGER_ENABLED } from './common/constants'
const logger = logdown('Livepeer:Index')
logger.state.isEnabled = LOGGER_ENABLED
// Axios default cfg
axios.defaults.baseURL = AXIOS_BASE_URL
const googleAnalyticsURL = GOOGLE_ANALYTICS_URL
// Google analytics
if (process.env && process.env.NODE_ENV === 'production' && googleAnalyticsURL) {
  logger.log('Initialization of google analytics with UID: ', googleAnalyticsURL)
  ReactGA.initialize(googleAnalyticsURL)
  ReactGA.pageview('/')
}

const app = (
  <Router>
    <App />
  </Router>
)
ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
