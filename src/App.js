import PrivateRoute from './Components/Common/Hoc/PrivateRoute/PrivateRoute'
import React, { Component } from 'react'
import Spinner from './Components/Common/UI/Spinner/Spinner'
import { AccountSummarySubscriptionForm } from './Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummarySubscriptionForm'
import { Route, Switch, withRouter } from 'react-router-dom'
import { HomeComponent, AccountSummaryComponent } from './Components'
import { Redirect } from 'react-router'
import Web3Provider, {
  Web3ContextConsumer
} from './Components/Common/Hoc/Web3Provider/Web3Provider'
import Footer from './Components/Common/Footer/Footer.js'
import PagesHeader from './Components/Common/Header/PagesHeader.js'
import PropTypes from 'prop-types'
import bgImage from './assets/img/bg/5.jpg'
import pagesStyle from './assets/jss/dashboard/layouts/pagesStyle.js'
import withStyles from '@material-ui/core/styles/withStyles'
import logdown from 'logdown'
import ReactGA from 'react-ga'
import { BrowserRouter as Router } from 'react-router-dom'
const logger = logdown('Livepeer:App')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export class App extends Component {
  state = {
    render: true
  }

  onRouteChanged = () => {
    // Google analytics
    if (this.props.location && this.props.location.pathname) {
      logger.log('Google analytics: ', this.props.location.pathname)
      ReactGA.pageview(this.props.location.pathname)
    }
  }

  componentDidMount() {
    document.body.style.overflow = 'unset'
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    logger.log('Fire event shouldComponentUpdate')
    let shouldUpdate = true
    if (this.props.userData && nextProps.userData) {
      shouldUpdate =
        this.props.render !== nextProps.render ||
        this.props.userData.authenticated !== nextProps.userData.authenticated ||
        this.props.userData.address !== nextProps.userData.address ||
        this.props.userData.currentNetwork !== nextProps.userData.currentNetwork
    }
    return shouldUpdate
  }

  render() {
    const { classes, ...rest } = this.props
    const spinner = <Spinner />

    const routes = (
      <div className={classes.wrapper} ref="wrapper">
        <div className={classes.fullPage} style={{ backgroundImage: 'url(' + bgImage + ')' }}>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <HomeComponent {...this.state} {...this.props} {...routeProps} />
              )}
            />
            <Web3Provider>
              <Web3ContextConsumer>
                {({ web3, userData, authenticated, error, displayMsg }) => {
                  return (
                    <>
                      <Switch>
                        <PrivateRoute
                          exact
                          path="/(account|account/demo)/"
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
          <Footer white />
        </div>
      </div>
    )
    let content = this.state.render ? routes : spinner

    return (
      <Router>
        <>
          <PagesHeader {...rest} />
          {content}
        </>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(pagesStyle)(withRouter(App))
