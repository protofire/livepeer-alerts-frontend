import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './components'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/account" component={AccountSummaryComponent} />
          </header>
        </div>
      </Router>
    )
  }
}

export default App
