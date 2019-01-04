import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './Components'
import PrivateRoute from './Components/Common/Hoc/PrivateRoute/PrivateRoute'
import Spinner from './Components/Common/UI/Spinner/Spinner'
import logger from './utils'
import { AccountSummarySubscriptionForm } from './Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummarySubscriptionForm'
import Redirect from 'react-router-dom/es/Redirect'
import Web3Provider from './Components/Common/Hoc/Web3Provider/Web3Provider'

export class App extends Component {
  state = {
    render: true
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    logger.log('Trigger shouldComponentUpdate')
    let shouldUpdate =
      this.props.render !== nextProps.render ||
      this.props.userData.authenticated !== nextProps.userData.authenticated ||
      this.props.userData.address !== nextProps.userData.address ||
      this.props.userData.currentNetwork !== nextProps.userData.currentNetwork
    return shouldUpdate
  }

  render() {
    const spinner = <Spinner />
    const routes = (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <HomeComponent {...this.state} {...this.props} {...routeProps} />}
          />
          <Web3Provider>
            <PrivateRoute exact path="/account" component={AccountSummaryComponent} />
            <PrivateRoute
              exact
              path="/account/subscription"
              component={AccountSummarySubscriptionForm}
            />
          </Web3Provider>
          <Redirect to="/" />
        </Switch>
      </>
    )
    let content = this.state.render ? routes : spinner

    return (
      <Router>
        <div className="App">
          <header className="App-header">{content}</header>
        </div>
      </Router>
    )
  }
}

export default App
