import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Common/UI/Spinner/Spinner'
import * as displayTexts from './AccountSummaryTexts'
import AccountSummaryHome from './AccountSummaryHome/AccountSummaryHome'
import { toast, ToastContainer } from 'react-toastify'

export class AccountSummaryComponent extends Component {
  state = {
    userData: {
      address: null,
      isSubscribed: false,
      activated: null,
      id: null,
      email: 'test@altoros.com',
      frequency: 'weekly',
      activatedCode: null,
      createdAt: null
    },
    summary: {
      bondedAmount: '',
      fees: '',
      lastClaimRound: '',
      startRound: '',
      status: 'Bonded',
      withdrawRound: '',
      stake: ''
    },
    render: false,
    displayMsg: displayTexts.LOADING_USER_DATA,
    toastId: 1,
    error: false
  }

  initState = callback => {
    this.setState(
      {
        userData: {
          ...this.state.userData,
          address: this.props.userData.address,
          ethBalance: this.props.userData.ethBalance
        }
      },
      callback
    )
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('[AccountSummary.js] componentWillReceive props ', nextProps)
    let propsChanged = false
    propsChanged =
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
          console.log('Reloading user data')
          console.log('state before reloading: ', this.state)
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
        () => console.log('[Loading userData finished] ', this.state)
      )
    } catch (exception) {
      console.log('exception ', exception)
    }
  }

  componentDidMount = async () => {
    console.log('[AccountSummaryComponent.js] componentDidMount')
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
          () => console.log('[ComponentDidMountFinished] ', this.state)
        )
      } catch (exception) {
        console.log('exception ', exception)
      }
    })
  }

  fetchSubscriptionData = async () => {
    return new Promise(async (resolve, reject) => {
      let userData
      try {
        console.log('address to fetch subscription data ', this.state.userData.address)
        userData = await axios.get('/address/' + this.state.userData.address)
        this.setState(
          {
            userData: {
              ...this.state.userData,
              isSubscribed: true,
              ...userData.data
            }
          },
          () => resolve(this.state)
        )
      } catch (error) {
        /** Subscription not found **/
        if (error.response && error.response.status === 404) {
          console.log('Subscription not found for ', this.state.userData.address)
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
              bondedAmount: summaryData.data.summary.bondedAmount,
              fees: summaryData.data.summary.fees,
              lastClaimRound: summaryData.data.summary.lastClaimRound,
              startRound: summaryData.data.summary.startRound,
              status: summaryData.data.summary.status,
              withdrawRound: summaryData.data.summary.withdrawRound,
              stake: summaryData.data.summary.totalStake
            },
            lpBalance: summaryData.data.balance
          },
          () => resolve(summaryData.data)
        )
      } catch (exception) {
        reject(exception)
      }
    })
  }

  /*  componentDidMount = async () => {
      console.log('[AccountSummaryComponent.js] componentDidMount')
      let userDataPromise, summaryPromise
      await this.initState()
      try {
        userDataPromise = axios.get('/address/' + this.state.userData.address)
        summaryPromise = axios.get('/summary/' + this.state.userData.address)
        let resultValues = await Promise.all([userDataPromise, summaryPromise])
        let userData = resultValues[0]
        let summaryData = resultValues[1]
        this.setState({
          userData: {
            ...this.state.userData,
            isSubscribed: true,
            activated: userData.data.activated,
            id: userData.data._id,
            activatedCode: userData.data.activatedCode,
            createdAt: userData.data.createdAt,
            email: userData.data.email,
            frequency: userData.data.frequency
          },
          summary: {
            bondedAmount: summaryData.data.summary.bondedAmount,
            fees: summaryData.data.summary.fees,
            lastClaimRound: summaryData.data.summary.lastClaimRound,
            startRound: summaryData.data.summary.startRound,
            status: summaryData.data.summary.status,
            withdrawRound: summaryData.data.summary.withdrawRound,
            stake: summaryData.data.summary.totalStake
          },
          render: true,
          displayMsg: displayTexts.WELCOME_AGAIN + this.state.userData.email,
          error: false,
          lpBalance: summaryData.data.balance
        })
      } catch (error) {
        /!** Subscription not found **!/
        if (error.response && error.response.status === 404) {
          console.log('Subscription not found')
          await this.fetchAccountSummaryData()
          this.setState({
            userData: {
              ...this.state.userData,
              isSubscribed: false
            },
            render: true,
            displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED,
            error: true
          })
        } else {
          console.log('[AccountSummary.js] exception on getRequest', error)
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
    }*/

  sendToast = toastTime => {
    console.log('Sending toast')
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
          toastId: this.state.toastId
        })
      } else {
        toast.success(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: time,
          toastId: this.state.toastId
        })
      }
    }
  }

  onSubscribeBtnHandler = async () => {
    console.log('[AccountSummary.js] subscribe btnHandler')
    this.props.history.push('/account/subscription')
  }

  onUnSubscribeBtnHandler = async () => {
    console.log('[AccountSummary.js] unsubscribe btnHandler')
    this.setState({
      render: false,
      displayMsg: displayTexts.LOADING_UNSUBSCRIPTION
    })
    const data = {
      username: 'test'
    }
    try {
      await axios.delete('/' + this.state.userData.id, data)
      console.log('User unsubscribed')
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
      console.log('[AccountSummary.js] exception on deleteSubscription')
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

  onSubscriptionChangeHandler = () => {
    console.log('[AccountSummary.js] onSubscriptionChangeHandler')
  }

  render() {
    let content = (
      <>
        <h3>{this.state.displayMsg}</h3>
        <Spinner />
      </>
    )
    if (this.state.render) {
      content = (
        <>
          <AccountSummaryHome
            onUnSubscribeBtnHandler={this.onUnSubscribeBtnHandler}
            onSubscriptionChangeHandler={this.onSubscriptionChangeHandler}
            onSubscribeBtnHandler={this.onSubscribeBtnHandler}
            web3={this.props.web3}
            userData={this.state.userData}
            summary={this.state.summary}
            lpBalance={this.state.lpBalance}
          />
        </>
      )
    }
    return (
      <div>
        {content}
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}
