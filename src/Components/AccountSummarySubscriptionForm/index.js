import * as displayTexts from '../../Texts/AccountSummary'
import AccountSummaryFormDisplay from '../AccountSummaryFormDisplay'
import React, { Component } from 'react'
import axios from 'axios'
import validator from 'validator'
import { toast, ToastContainer } from 'react-toastify'
import logdown from 'logdown'
import AccountSummaryModalEmail from '../AccountSummaryModalEmail'
import ReactGA from 'react-ga'
import { isFrequencySupported } from '../../Utils'

const logger = logdown('Livepeer:AccountSummarySubscriptionForm')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export class AccountSummarySubscriptionForm extends Component {
  state = {
    form: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        validation: {
          required: true,
          emailCheck: true,
        },
        value: '',
        touched: false,
        valid: false,
      },
      formIsValid: false,
    },
    address: null,
    frequency: 'daily',
    render: false,
    toastId: '1',
    displayMsg: displayTexts.LOADING_SUBSCRIPTION_DATA,
    displaySubscriptionModal: false,
  }

  componentWillReceiveProps(nextProps, nextContext) {
    logger.log('Fire event componentWillReceiveProps')
    this.setState({
      ...this.state,
      address: nextProps.userData.address,
    })
  }

  componentDidMount() {
    logger.log('Fire event componentDidMount')
    const { userData, location } = this.props
    // Google analytics
    if (location && location.pathname) {
      logger.log('Google analytics: ', location.pathname)
      ReactGA.pageview(location.pathname)
    }
    this.setState({
      address: userData.address,
      render: true,
    })
  }

  onSubmitBtnHandler = async event => {
    event.preventDefault()
    logger.log('Submit btnHandler')
    const { address, frequency, form } = this.state
    let data = {
      address: address,
      emailFrequency: frequency,
      email: form.email.value,
    }
    this.setState(
      {
        render: false,
        displayMsg: displayTexts.GENERATING_SUBSCRIPTION,
      },
      async () => await this.generateSubscription(data),
    )
  }

  onCancelBtnHandler = event => {
    logger.log('Cancel btnHandler')
    this.props.history.push('/account')
  }

  onEmailModalClosed = event => {
    logger.log('Email modal closed')
    this.props.history.push('/account')
  }

  generateSubscription = async (data, callback) => {
    let response
    try {
      logger.log('Creating new subscriber with data: ', data)
      response = await axios.post('', data)
      this.setState(
        {
          userData: {
            ...this.props.userData,
            activated: response.data.activated,
            id: response.data._id,
            activatedCode: response.data.activated,
            createdAt: response.data.createdAt,
            isSubscribed: true,
          },
          render: true,
          error: false,
          displayMsg: displayTexts.WELCOME_NEW_SUBSCRIBER,
          displaySubscriptionModal: false,
        },
        () => {
          setTimeout(callback, 1000)
        },
      )
    } catch (exception) {
      logger.log('Exception on postSubscription')
      let responseMsg = exception.response.data.message
      let displayMsg
      // Email already exists
      if (
        (responseMsg && responseMsg === displayTexts.FAIL_EMAIL_ALREADY_EXISTS_RESPONSE) ||
        exception.response.status === 422
      ) {
        displayMsg = displayTexts.EMAIL_ALREADY_EXISTS
      } else {
        displayMsg = displayTexts.FAIL_NO_REASON
      }
      this.setState(
        {
          render: true,
          displayMsg: displayMsg,
          error: true,
          displaySubscriptionModal: false,
        },
        () => {
          this.sendToast()
        },
      )
    }
  }

  sendToast = (toastTime, callback) => {
    let time = 2000
    if (toastTime) {
      time = toastTime
    }
    let displayMsg = this.state.displayMsg

    if (!toast.isActive(this.state.toastId)) {
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

  checkValidity = (value, rules) => {
    let isValid = true

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.emailCheck) {
      isValid = validator.isEmail(value) && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.form,
    }
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
      value: event.target.value,
    }
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    formIsValid = updatedForm[inputIdentifier].valid && formIsValid
    updatedForm.formIsValid = formIsValid
    this.setState({ form: updatedForm })
  }

  frequencyChangedHandler = newFrequency => {
    // Validates that the new frequency is supported
    if (isFrequencySupported(newFrequency)) {
      this.setState({
        frequency: newFrequency,
      })
    }
  }

  render() {
    const { form, displaySubscriptionModal } = this.state
    const { subscriberData } = this.props
    return (
      <>
        {displaySubscriptionModal ? (
          <AccountSummaryModalEmail onEmailModalClosed={this.onEmailModalClosed} />
        ) : (
          <AccountSummaryFormDisplay
            form={form}
            inputChangedHandler={this.inputChangedHandler}
            onCancelBtnHandler={this.onCancelBtnHandler}
            onSubmitBtnHandler={this.onSubmitBtnHandler}
            frequencyChangedHandler={this.frequencyChangedHandler}
            isSubscribed={subscriberData && subscriberData.isSubscribed}
          />
        )}
        <ToastContainer autoClose={5000} />
      </>
    )
  }
}
