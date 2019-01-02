import React, { Component } from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import axios from 'axios'
import { toast } from 'react-toastify'

export class AccountSummarySubscriptionForm extends Component {
  onSubmitBtnHandler = async () => {
    console.log('[AccountSummarySubscriptionForm.js] submit btnHandler')
    let response
    this.setState({
      render: false,
      displayMsg: displayTexts.LOADING_SUBSCRIPTION
    })
    const data = {
      email: this.props.userData.email,
      address: this.props.userData.address,
      frequency: this.props.userData.frequency
    }
    try {
      console.log('Creating new subscriber with data: ', data)
      response = await axios.post('', data)
      this.setState({
        userData: {
          ...this.props.userData,
          activated: response.data.activated,
          id: response.data._id,
          activatedCode: response.data.activated,
          createdAt: response.data.createdAt,
          isSubscribed: true
        },
        render: true,
        error: false,
        displayMsg: displayTexts.WELCOME_NEW_SUBSCRIBER + this.props.userData.email
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

  render() {
    let content = (
      <>
        <h1>Welcome to subscription form</h1>
        <form>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </>
    )
    return <div>{content}</div>
  }
}
