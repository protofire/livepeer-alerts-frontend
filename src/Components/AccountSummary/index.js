import * as displayTexts from '../../Texts/AccountSummary'
import AccountSummaryHome from '../AccountSummaryHome'
import React, { Component } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import logdown from 'logdown'
import ReactGA from 'react-ga'
import FullLoading from '../Common/FullLoading'

const logger = logdown('Livepeer:AccountSummary')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export class AccountSummary extends Component {
  state = {
    render: false,
    displayMsg: displayTexts.LOADING_USER_DATA,
    toastId: 1,
    error: false,
  }

  initState = callback => {
    let address = this.props.userData ? this.props.userData.address : ''
    const stringAddresses = process.env.REACT_APP_DEMO_ADDRESS
    // If we are on demo version we choose a random address
    if (this.props.location && this.props.location.pathname === '/account/demo') {
      if (typeof stringAddresses !== 'undefined' && stringAddresses.length > 0) {
        // We have addresses on the env var
        const addresses = stringAddresses && stringAddresses.split(',')
        address = addresses && addresses[Math.floor(Math.random() * addresses.length)]
      } else {
        // The user does not have addresses on the env var, we redirect to the home page
        this.props.history.push('/')
      }
    }
    this.setState(
      {
        userData: {
          ...this.state.userData,
          address: address,
          ethBalance: this.props.userData.ethBalance,
          authenticated: this.props.userData.authenticated,
        },
      },
      callback,
    )
  }

  componentDidMount = async () => {
    logger.log('Fire event componentDidMount')

    if (this.props.location && this.props.location.pathname) {
      logger.log('Google analytics: ', this.props.location.pathname)
      ReactGA.pageview(this.props.location.pathname)
    }
  }

  sendToast = (toastTime, callback) => {
    let time = 6000
    if (toastTime) {
      time = toastTime
    }
    let displayMsg = this.state.displayMsg

    if (!toast.isActive(this.state.toastId) && this.state.render) {
      if (this.state.error) {
        toast.error(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: time,
          toastId: this.state.toastId,
          onClose: callback,
        })
      } else {
        toast.success(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: time,
          toastId: this.state.toastId,
          onClose: callback,
        })
      }
    }
  }

  onUnSubscribeBtnHandler = async () => {
    logger.log('Unsubscribe btnHandler')
    this.setState({
      render: false,
      displayMsg: displayTexts.LOADING_UNSUBSCRIPTION,
    })
    try {
      logger.log('Unsubscribing user with id ', this.state.userData)
      await axios.delete(`/subscribers/${this.state.userData.id}`)
      this.setState(
        {
          render: true,
          displayMsg: displayTexts.UNSUBSCRIPTION_SUCCESSFUL,
          userData: {
            ...this.state.userData,
            isSubscribed: false,
            activated: null,
            id: null,
            activatedCode: null,
            createdAt: null,
            error: false,
          },
        },
        () => this.sendToast(),
      )
    } catch (exception) {
      logger.log('Exception on deleteSubscription')
      if (exception.response.status === 404) {
        // User with that id not found
        this.setState(
          {
            render: true,
            displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED,
            error: true,
          },
          () => this.sendToast(),
        )
      } else {
        this.setState(
          {
            render: true,
            displayMsg: displayTexts.FAIL_NO_REASON,
            error: true,
          },
          () => this.sendToast(),
        )
      }
    }
  }

  render() {
    let content = <FullLoading show={true} message={this.state.displayMsg} />
    const { subscriberData, summaryData, userData, earnedRewardData } = this.props
    // Shows only summary information according the role (delegate or delegator)
    let summaryForRole = summaryData.delegate ? summaryData.delegate : summaryData.delegator

    let summaryProps = {
      ...summaryForRole,
      role: summaryData.role,
      balance: summaryData.lpBalance,
      loadingSummary: summaryData.loadingSummary,
    }

    if (!this.state.error) {
      content = (
        <AccountSummaryHome
          lpBalance={summaryData.lpBalance}
          onUnSubscribeBtnHandler={this.onUnSubscribeBtnHandler}
          summary={summaryProps}
          userData={userData}
          subscriberData={subscriberData}
          earnedRewardData={earnedRewardData}
          web3={this.props.web3}
        />
      )
    }

    return (
      <>
        {content}
        <ToastContainer autoClose={5000} />
      </>
    )
  }
}
