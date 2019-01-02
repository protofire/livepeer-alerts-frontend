import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Common/UI/Spinner/Spinner'
import * as displayTexts from './AccountSummaryTexts'
import UserSubscribed from './UserSubscribed/UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed/UserNotSubscribed'
import * as failReasons from '../Common/Hoc/Web3Provider/Web3FailReasons'
import * as texts from '../Common/UI/Texts/Texts'
import { toast } from 'react-toastify'

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
      withdrawRound: ''
    },
    render: false,
    displayMsg: displayTexts.LOADING_USER_DATA,
    toastId: 1
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
    await this.initState()
    try {
      response = await axios.get('/address/' + this.state.userData.address)
      this.setState({
        userData: {
          ...this.state.userData,
          ...this.props.userData,
          isSubscribed: true,
          activated: response.data.activated,
          id: response.data._id,
          activatedCode: response.data.activatedCode,
          createdAt: response.data.createdAt,
          email: response.data.email,
          frequency: response.data.frequency
        },
        render: true,
        displayMsg: displayTexts.WELCOME_AGAIN + this.state.userData.email
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
          displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED
        })
      } else {
        console.log('[AccountSummary.js] exception on getRequest', error)
        this.setState(
          {
            render: true,
            displayMsg: displayTexts.FAIL_NO_REASON
          },
          () => this.sendToastError()
        )
      }
    }
  }

  sendToastError = toastTime => {
    let time = 6000
    if (toastTime) {
      time = toastTime
    }
    let errorMsg = this.state.displayMsg

    if (!toast.isActive(this.state.toastId) && this.props.render) {
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
        progressClassName: 'Toast-progress-bar',
        autoClose: time,
        toastId: this.state.toastId,
        onOpen: this.props.toastOpenedHandler
      })
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
        displayMsg: displayTexts.WELCOME_NEW_SUBSCRIBER + this.state.userData.email
      })
    } catch (exception) {
      console.log('[AccountSummary.js] exception on postSubscription', exception)
      /** TODO -- PARSE WHEN EMAIL ALREADY EXISTS **/
      this.setState({
        render: true,
        displayMsg: displayTexts.FAIL_NO_REASON
      })
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
      this.setState({
        render: true,
        displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED,
        userData: {
          ...this.state.userData,
          ...this.props.userData,
          isSubscribed: false,
          activated: null,
          id: null,
          activatedCode: null,
          createdAt: null
        }
      })
    } catch (exception) {
      console.log('[AccountSummary.js] exception on deleteSubscription')
      if (exception.response.status === 404) {
        /** User with that id not found **/
        this.setState({
          render: true,
          displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED
        })
      } else {
        this.setState({
          render: true,
          displayMsg: displayTexts.FAIL_NO_REASON
        })
      }
    }
  }

  onSubscriptionChangeHandler = () => {}

  render() {
    let content = (
      <>
        <h3>{this.state.displayMsg}</h3>
        <Spinner />
      </>
    )
    if (this.state.render) {
      if (this.state.userData.isSubscribed) {
        content = (
          <>
            <UserSubscribed
              onUnSubscribeBtnHandler={this.onUnSubscribeBtnHandler}
              onSubscriptionChangeHandler={this.onSubscriptionChangeHandler}
              web3={this.props.web3}
              userData={this.state.userData}
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
            <p>In order to subscribe you need to be on BOUNDED status</p>
          </>
        )
      }
    }

    return <div>{content}</div>
  }
}
