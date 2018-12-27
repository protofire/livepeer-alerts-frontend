import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Common/UI/Spinner/Spinner'
import * as displayTexts from './AccountSummaryTexts'
import UserSubscribed from './UserSubscribed/UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed/UserNotSubscribed'

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
    render: false,
    displayMsg: displayTexts.LOADING_USER_DATA
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
    console.log('[AccountSummaryComponent.js] componentDidMount, userData: ', this.props.userData)
    let response
    await this.initState()
    try {
      response = await axios.get('/address/' + this.state.userData.address)
      this.setState({
        userData: {
          ...this.state.userData,
          isSubscribed: true,
          activated: response.data.activated,
          id: response.data._id,
          activatedCode: response.data.activatedCode,
          createdAt: response.data.createdAt
        },
        render: true,
        displayMsg: displayTexts.WELCOME_AGAIN + this.state.userData.email
      })
    } catch (error) {
      console.log('[AccountSummary.js] exception on getRequest')
      /** Subscription not found **/
      if (error.response.status === 404) {
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
        this.setState({
          render: true,
          displayMsg: displayTexts.FAIL_NO_REASON
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
      response = await axios.post('', data)
      console.log('User subscribed, response data: ', response.data)
      this.setState({
        userData: {
          ...this.state.userData,
          activated: response.data.activated,
          id: response.data._id,
          activatedCode: response.data.activated,
          createdAt: response.data.createdAt,
          isSubscribed: true
        },
        render: true,
        displayMsg: displayTexts.WELCOME_NEW_SUBSCRIBER + this.state.userData.email
      })
      console.log('Final state: ', this.state.userData)
    } catch (exception) {
      console.log('[AccountSummary.js] exception on postSubscription', exception)
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
        const userData = {
          email: this.state.userData.email,
          frequency: this.state.userData.frequency,
          id: this.state.userData.id,
          address: this.state.userData.address,
          activated: this.state.userData.activated,
          createdAt: this.state.userData.createdAt
        }
        content = (
          <>
            <UserSubscribed
              userData={userData}
              onUnSubscribeBtnHandler={this.onUnSubscribeBtnHandler}
              onSubscriptionChangeHandler={this.onSubscriptionChangeHandler}
            />
          </>
        )
      } else {
        content = (
          <>
            <UserNotSubscribed onSubscribeBtnHandler={this.onSubscribeBtnHandler} />
          </>
        )
      }
    }

    return <div>{content}</div>
  }
}
