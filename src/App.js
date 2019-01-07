import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './Components'
import PrivateRoute from './Components/Common/Hoc/PrivateRoute/PrivateRoute'
import Spinner from './Components/Common/UI/Spinner/Spinner'
import logger from './utils'
import { AccountSummarySubscriptionForm } from './Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummarySubscriptionForm'
import { Redirect } from 'react-router'
import Web3Provider, {
  Web3ContextConsumer
} from './Components/Common/Hoc/Web3Provider/Web3Provider'

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
            <Web3ContextConsumer>
              {({ web3, userData, authenticated, error, displayMsg }) => {
                return (
                  <>
                    <Switch>
                      <PrivateRoute
                        exact
                        path="/account"
                        web3={web3}
                        userData={userData}
                        authenticated={authenticated}
                        error={error}
                        displayMsg={displayMsg}
                        component={AccountSummaryComponent}
                      />
                      <PrivateRoute
                        exact
                        path="/account/subscription"
                        component={AccountSummarySubscriptionForm}
                        web3={web3}
                        userData={userData}
                        error={error}
                        displayMsg={displayMsg}
                        authenticated={authenticated}
                      />
                      <Redirect to="/" />
                    </Switch>
                  </>
                )
              }}
            </Web3ContextConsumer>
          </Web3Provider>
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

export default withRouter(App)
