import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/livepeer.css?v=1.4.0'
import App from './App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

/** Axios default cfg **/
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
