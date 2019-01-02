import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Common/UI/Spinner/Spinner'
import * as displayTexts from './AccountSummaryTexts'
import UserSubscribed from './UserSubscribed/UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed/UserNotSubscribed'
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

  initState = async () => {
    this.setState({
      userData: {
        ...this.state.userData,
        address: this.props.userData.address
      }
    })
  }

  componentDidMount = async () => {
    console.log('[AccountSummaryComponent.js] componentDidMount')
    let response
    let userDataPromise, summaryPromise
    await this.initState()
    try {
      userDataPromise = axios.get('/address/' + this.state.userData.address)
      summaryPromise = axios.get('/summary/' + this.state.userData.address)
      Promise.all([userDataPromise, summaryPromise]).then(resultValues => {
        let userData = resultValues[0]
        let summaryData = resultValues[1]
        console.log('Promise all finished')
        this.setState(
          {
            userData: {
              ...this.state.userData,
              ...this.props.userData,
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
          },
          () => console.log('setting state finished ', this.state)
        )
      })
    } catch (error) {
      /** Subscription not found **/
      if (error.response && error.response.status === 404) {
        console.log('Subscription not found')
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
  }

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
    let response
    this.setState({
      render: false,
      displayMsg: displayTexts.LOADING_SUBSCRIPTION
    })
    const data = {
      email: this.state.userData.email,
      address: this.state.userData.address,
      frequency: this.state.userData.frequency
    }
    try {
      console.log('Creating new subscriber with data: ', data)
      response = await axios.post('', data)
      console.log('User subscribed, response data: ', response.data)
      this.setState({
        userData: {
          ...this.state.userData,
          ...this.props.userData,
          activated: response.data.activated,
          id: response.data._id,
          activatedCode: response.data.activated,
          createdAt: response.data.createdAt,
          isSubscribed: true
        },
        render: true,
        error: false,
        displayMsg: displayTexts.WELCOME_NEW_SUBSCRIBER + this.state.userData.email
      })
    } catch (exception) {
      console.log('[AccountSummary.js] exception on postSubscription', exception)
      /** TODO -- PARSE WHEN EMAIL ALREADY EXISTS **/
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
            ...this.props.userData,
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
    console.log('Should RENDER ', this.state.render)
    if (this.state.render) {
      if (this.state.userData.isSubscribed) {
        content = (
          <>
            <UserSubscribed
              onUnSubscribeBtnHandler={this.onUnSubscribeBtnHandler}
              onSubscriptionChangeHandler={this.onSubscriptionChangeHandler}
              web3={this.props.web3}
              userData={this.state.userData}
              summary={this.state.summary}
              lpBalance={this.state.lpBalance}
            />
          </>
        )
        /** If the user is not subscribed he can only subscribe if his status is bounded **/
      } else if (this.state.summary.status === 'Bonded') {
        content = (
          <>
            <UserNotSubscribed onSubscribeBtnHandler={this.onSubscribeBtnHandler} />
          </>
        )
      } /** Otherwise we notify the user about that  **/ else {
        content = (
          <>
            <p>{displayTexts.BOUNDED_STATUS_NEEDED}</p>
          </>
        )
      }
    }

    return (
      <div>
        {content}
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}
