import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './Components'
import PrivateRoute from './Components/Common/Hoc/PrivateRoute/PrivateRoute'
import withWeb3Provider from './Components/Common/Hoc/Web3Provider/Web3FunctionalProvider'
import Spinner from './Components/Common/UI/Spinner/Spinner'
import { AccountSummarySubscriptionForm } from './Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummarySubscriptionForm'
import Redirect from 'react-router-dom/es/Redirect'
import Web3Provider from './Components/Common/Hoc/Web3Provider/Web3Provider'

export class App extends Component {
  state = {
    userData: {
      address: null,
      authenticated: true,
      currentNetwork: ''
    },
    render: true
  }

  /*  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[App.js] shouldComponentUpdate')
    let shouldUpdate =
      this.props.render !== nextProps.render ||
      this.props.userData.authenticated !== nextProps.userData.authenticated ||
      this.props.userData.address !== nextProps.userData.address ||
      this.props.userData.currentNetwork !== nextProps.userData.currentNetwork
    return shouldUpdate
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      ...nextProps
    })
  }

  componentDidMount() {
    this.setState({
      userData: {
        address: this.props.userData.address,
        authenticated: this.props.userData.authenticated,
        currentNetwork: this.props.userData.currentNetwork
      }
    })
  }*/

  render() {
    //console.log('[App.js] render, web3 address: ', this.state.userData.address)
    let content = <Spinner />
    if (this.state.render) {
      content = (
        <>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <HomeComponent {...this.state} {...this.props} {...routeProps} />
              )}
            />
            <Web3Provider>
              <PrivateRoute
                authenticated={this.state.userData.authenticated}
                exact
                path="/account"
                web3={this.props.web3}
                userData={this.state.userData}
                component={AccountSummaryComponent}
              />
              <PrivateRoute
                authenticated={this.state.userData.authenticated}
                exact
                path="/account/subscription"
                web3={this.props.web3}
                userData={this.state.userData}
                component={AccountSummarySubscriptionForm}
              />
            </Web3Provider>
            <Redirect to="/" />
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

export default App
