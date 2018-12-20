import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './components'
import { PrivateRoute } from './components/Common/PrivateRoute/PrivateRoute'

import Web3 from 'web3'

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authenticated: null
    }
  }

  componentWillMount = () =>{
    if(typeof window !== 'undefined' && typeof window.web3 !=='undefined') {
      let web3 = new Web3(window.web3.currentProvider);
      this.setState({authenticated: web3.currentProvider.isConnected()})
    }
  }

  onAppInit = () =>{
    console.log("On app init");
    if(typeof window !== 'undefined' && typeof window.web3 !=='undefined'){
     // web3 = new Web3(window.web3.currentProvider);
     // console.log("Web3 Connected: ", web3.currentProvider.isConnected());
     // this.setState({authenticated: web3.currentProvider.isConnected()})
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route exact path="/" component={HomeComponent} onEnter={this.onAppInit()}/>
            <PrivateRoute authenticated={this.state.authenticated} exact path="/account" component={AccountSummaryComponent} />
          </header>
        </div>
      </Router>
    )
  }
}


export default App
