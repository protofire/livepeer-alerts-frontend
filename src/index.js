import * as serviceWorker from './serviceWorker'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import logdown from 'logdown'
import 'sanitize.css'
import './assets/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'

const logger = logdown('Livepeer:Index')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'
/** Axios default cfg **/
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

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
