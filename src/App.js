import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './Components'
import PrivateRoute from './Components/Common/Hoc/PrivateRoute/PrivateRoute'
import withWeb3Provider from './Components/Common/Hoc/Web3Provider/Web3Provider'
import Spinner from './Components/Common/UI/Spinner/Spinner'

export class App extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[App.js] shouldComponentUpdate')
    let shouldUpdate =
      this.props.render !== nextProps.render ||
      this.props.userData.authenticated !== nextProps.userData.authenticated ||
      this.props.userData.address !== nextProps.userData.address ||
      this.props.userData.currentNetwork !== nextProps.userData.currentNetwork
    return shouldUpdate
  }

  render() {
    console.log('[App.js] render, web3 address: ', this.props.userData.address)
    let content = <Spinner />
    if (this.props.render) {
      content = (
        <>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => <HomeComponent {...this.props} {...routeProps} />}
            />
            <PrivateRoute
              authenticated={this.props.userData.authenticated}
              exact
              path="/account"
              web3={this.props.web3}
              userData={this.props.userData}
              component={AccountSummaryComponent}
            />
          </Switch>
        </>
      )
    }
    return (
      <Router>
        <div className="App">
          <header className="App-header">{content}</header>
        </div>
      </Router>
    )
  }
}

export default withWeb3Provider(App)
