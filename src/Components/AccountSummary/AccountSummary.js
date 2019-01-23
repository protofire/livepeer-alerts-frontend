import * as displayTexts from './AccountSummaryTexts'
import AccountSummaryHome from './AccountSummaryHome/AccountSummaryHome'
import React, { Component } from 'react'
import SpinnerExtended from '../Common/UI/SpinnerExtended/SpinnerExtended'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import logdown from 'logdown'

const logger = logdown('Livepeer:AccountSummary')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export class AccountSummaryComponent extends Component {
  state = {
    userData: {
      address: null,
      isSubscribed: false,
      activated: null,
      id: null,
      email: '',
      frequency: 'daily',
      activatedCode: null,
      createdAt: null
    },
    summary: {
      role: '',
      lpBalance: '',
      delegator: {
        address: '',
        allowance: '0',
        bondedAmount: '0',
        delegateAddress: '',
        delegatedAmount: '0',
        fees: '0',
        lastClaimRound: '0',
        pendingFees: '0',
        pendingStake: '0',
        startRound: '0',
        status: '',
        withdrawRound: '0',
        withdrawAmount: '0',
        nextUnbondingLockId: '0',
        totalStake: '0',
        delegateCalledReward: false,
        totalStakeInLPT: '0',
        bondedAmountInLPT: '0'
      },
      delegate: {
        active: true,
        address: '',
        feeShare: '',
        lastRewardRound: '',
        pricePerSegment: '',
        pendingRewardCut: '',
        pendingFeeShare: '',
        pendingPricePerSegment: '',
        rewardCut: '',
        status: '',
        totalStake: '',
        delegateCalledReward: false,
        totalStakeInLPT: ''
      }
    },
    render: false,
    displayMsg: displayTexts.LOADING_USER_DATA,
    toastId: 1,
    error: false
  }

  componentWillReceiveProps(nextProps, nextContext) {
    logger.log('Fire event componentWillReceiveProps', nextProps)
    let propsChanged =
      this.props.render !== nextProps.render ||
      this.props.userData.authenticated !== nextProps.userData.authenticated ||
      this.props.userData.address !== nextProps.userData.address ||
      this.props.userData.currentNetwork !== nextProps.userData.currentNetwork
    if (propsChanged) {
      this.setState(
        {
          ...this.state,
          ...nextProps,
          render: false
        },
        async () => {
          await this.loadUserData()
        }
      )
    }
  }

  loadUserData = async () => {
    let userDataPromise, summaryPromise
    /** Check if the user is subscribed **/
    userDataPromise = this.fetchSubscriptionData()
    /** Get summary information about the user **/
    summaryPromise = this.fetchAccountSummaryData()
    try {
      await Promise.all([userDataPromise, summaryPromise])
      this.setState(
        {
          ...this.state,
          render: true,
          displayMsg: displayTexts.WELCOME_AGAIN + this.state.userData.email
        },
        () => logger.log('Loading userData finished', this.state)
      )
    } catch (exception) {
      logger.log('exception ', exception)
    }
  }

  initState = callback => {
    let address = this.props.userData ? this.props.userData.address : ''
    const stringAddresses = process.env.REACT_APP_DEMO_ADDRESS
    /** If we are on demo version we choose a random address **/
    if (this.props.location && this.props.location.pathname === '/account/demo') {
      if (typeof stringAddresses !== 'undefined' && stringAddresses.length > 0) {
        /** We have addresses on the env var **/
        const addresses = stringAddresses && stringAddresses.split(',')
        address = addresses && addresses[Math.floor(Math.random() * addresses.length)]
      } else {
        /** The user does not have addresses on the env var, we redirect to the home page **/
        this.props.history.push('/')
      }
    }
    this.setState(
      {
        userData: {
          ...this.state.userData,
          address: address,
          ethBalance: this.props.userData.ethBalance,
          authenticated: this.props.userData.authenticated
        }
      },
      callback
    )
  }

  componentDidMount = async () => {
    logger.log('Fire event componentDidMount')
    let userDataPromise, summaryPromise
    this.initState(async () => {
      /** Check if the user is subscribed **/
      userDataPromise = this.fetchSubscriptionData()
      /** Get summary information about the user **/
      summaryPromise = this.fetchAccountSummaryData()
      try {
        await Promise.all([userDataPromise, summaryPromise])
        this.setState(
          {
            ...this.state,
            render: true,
            displayMsg: displayTexts.WELCOME_AGAIN + this.state.userData.email
          },
          () => logger.log('ComponentDidMountFinished ')
        )
      } catch (exception) {
        this.setState(
          {
            ...this.state,
            render: true,
            error: true,
            displayMsg: displayTexts.FAIL_NO_REASON_REDIRECT
          },
          () => {
            this.sendToast(1500, () => this.props.history.push('/'))
          }
        )
      }
    })
  }

  fetchSubscriptionData = async () => {
    return new Promise(async (resolve, reject) => {
      let userData
      try {
        logger.log('Retrieving subscription for address ', this.state.userData.address)
        userData = await axios.get('/address/' + this.state.userData.address)
        this.setState(
          {
            userData: {
              ...this.state.userData,
              isSubscribed: true,
              id: userData.data._id,
              ...userData.data
            }
          },
          () => {
            resolve(this.state)
          }
        )
      } catch (error) {
        /** Subscription not found **/
        if (error.response && error.response.status === 404) {
          logger.log('Subscription not found for ', this.state.userData.address)
          this.setState(
            {
              ...this.state,
              isSubscribed: false
            },
            () => resolve(this.state)
          )
        } else {
          /** Another network problem **/
          reject(error)
        }
      }
    })
  }

  fetchAccountSummaryData = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let summaryData = await axios.get('/summary/' + this.state.userData.address)
        this.setState(
          {
            summary: {
              role: summaryData.data.role,
              lpBalance: summaryData.data.balance,
              delegate: summaryData.data.transcoder ? { ...summaryData.data.transcoder } : null,
              delegator: summaryData.data.delegator ? { ...summaryData.data.delegator } : null
            }
          },
          () => resolve(summaryData.data)
        )
      } catch (exception) {
        reject(exception)
      }
    })
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
          onClose: callback
        })
      } else {
        toast.success(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: time,
          toastId: this.state.toastId,
          onClose: callback
        })
      }
    }
  }

  onSubscribeBtnHandler = async () => {
    this.props.history.push('/account/subscription')
  }

  onUnSubscribeBtnHandler = async () => {
    logger.log('Unsubscribe btnHandler')
    this.setState({
      render: false,
      displayMsg: displayTexts.LOADING_UNSUBSCRIPTION
    })
    try {
      logger.log('Unsubscribing user with id ', this.state.userData)
      await axios.delete('/' + this.state.userData.id)
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
            error: false
          }
        },
        () => this.sendToast()
      )
    } catch (exception) {
      logger.log('Exception on deleteSubscription')
      if (exception.response.status === 404) {
        /** User with that id not found **/
        this.setState(
          {
            render: true,
            displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED,
            error: true
          },
          () => this.sendToast()
        )
      } else {
        this.setState(
          {
            render: true,
            displayMsg: displayTexts.FAIL_NO_REASON,
            error: true
          },
          () => this.sendToast()
        )
      }
    }
  }

  render() {
    let content = <SpinnerExtended displayMsg={this.state.displayMsg} />
    /** Shows only summary information according the role (delegate or delegator) **/
    let summaryForRole = this.state.summary.delegate
      ? this.state.summary.delegate
      : this.state.summary.delegator
    let summaryProps = {
      ...summaryForRole,
      role: this.state.summary.role,
      balance: this.state.summary.lpBalance
    }

    if (this.state.render) {
      if (!this.state.error) {
        content = (
          <>
            <AccountSummaryHome
              onUnSubscribeBtnHandler={this.onUnSubscribeBtnHandler}
              onSubscribeBtnHandler={this.onSubscribeBtnHandler}
              web3={this.props.web3}
              userData={this.state.userData}
              summary={summaryProps}
              lpBalance={this.state.summary.lpBalance}
            />
          </>
        )
      } else {
        content = <SpinnerExtended displayMsg={this.state.displayMsg} />
      }
    }
    return (
      <>
        {content}
        <ToastContainer autoClose={2000} />
      </>
    )
  }
}
