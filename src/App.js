import React, { Component } from 'react'
import Footer from './Components/Common/Footer'
import Header from './Components/Common/Header'
import MainWrapper from './Components/Common/MainWrapper'
import MainScroll from './Components/Common/MainScroll'
import FullLoading from './Components/Common/FullLoading'
import PrivateRoute from './Components/Common/Hoc/PrivateRoute'
import ReactGA from 'react-ga'
import Web3Provider, { Web3ContextConsumer } from './Components/Common/Hoc/Web3Provider'
import SubscriberProvider, { SubscriberContextConsumer } from './Components/Common/Hoc/SubscriberProvider'
import logdown from 'logdown'
import { ThemeProvider } from 'styled-components'
import theme from './Theme'
import { AccountSummarySubscriptionForm } from './Components/AccountSummarySubscriptionForm'
import { BrowserRouter as Router } from 'react-router-dom'
import { HomeComponent, AccountSummary } from './Components'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'

const logger = logdown('Livepeer:App')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export class App extends Component {
  state = {
    render: true,
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
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <>
            <FullLoading show={!this.state.render} />
            <MainWrapper>
              <Web3Provider>
                <Web3ContextConsumer>
                  {({ web3, userData, connectWeb3, authenticated, error, displayMsg }) => {
                    return (
                      <>
                        <Header userData={userData} />
                        <MainScroll>
                          <Switch>
                            <Route
                              exact
                              path="/"
                              render={routeProps => (
                                <HomeComponent
                                  {...this.state}
                                  {...this.props}
                                  {...routeProps}
                                  connectWeb3={connectWeb3}
                                  userData={userData}
                                />
                              )}
                            />
                            <SubscriberProvider subscriberAddress={userData.address}>
                              <SubscriberContextConsumer>
                                {({
                                  subscriberData,
                                  summaryData,
                                  earnedRewardData,
                                  myDelegateData,
                                  unsubscribeUser,
                                  subscriberUser,
                                  updateUserSubscription,
                                }) => {
                                  return (
                                    <Switch>
                                      <PrivateRoute
                                        authenticated={authenticated}
                                        component={AccountSummary}
                                        displayMsg={displayMsg}
                                        error={error}
                                        exact
                                        path="/(account|account/demo)/"
                                        userData={userData}
                                        subscriberData={subscriberData}
                                        summaryData={summaryData}
                                        earnedRewardData={earnedRewardData}
                                        myDelegateData={myDelegateData}
                                        web3={web3}
                                        unsubscribeUser={unsubscribeUser}
                                      />
                                      <PrivateRoute
                                        authenticated={authenticated}
                                        component={AccountSummarySubscriptionForm}
                                        displayMsg={displayMsg}
                                        error={error}
                                        exact
                                        path="/account/subscription"
                                        userData={userData}
                                        summaryData={summaryData}
                                        subscriberData={subscriberData}
                                        earnedRewardData={earnedRewardData}
                                        myDelegateData={myDelegateData}
                                        unsubscribeUser={unsubscribeUser}
                                        web3={web3}
                                        subscriberUser={subscriberUser}
                                        updateUserSubscription={updateUserSubscription}
                                      />
                                      <Redirect to="/" />
                                    </Switch>
                                  )
                                }}
                              </SubscriberContextConsumer>
                            </SubscriberProvider>
                          </Switch>
                          <Footer />
                        </MainScroll>
                      </>
                    )
                  }}
                </Web3ContextConsumer>
              </Web3Provider>
            </MainWrapper>
          </>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App
