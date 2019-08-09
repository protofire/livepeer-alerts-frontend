import * as displayTexts from '../../Texts/AccountSummary'
import AccountSummaryFormDisplay from '../AccountSummaryFormDisplay'
import React, { Component } from 'react'
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
      checkbox: {
        option: 'daily',
      },
      formIsValid: false,
    },
    frequency: 'daily',
    toastId: '1',
    displayMsg: displayTexts.LOADING_SUBSCRIPTION_DATA,
    displaySubscriptionModal: false,
  }

  componentDidMount() {
    logger.log('Fire event componentDidMount')
    const { subscriberData, location } = this.props
    // Google analytics
    if (location && location.pathname) {
      logger.log('Google analytics: ', location.pathname)
      ReactGA.pageview(location.pathname)
    }
    // If the user is subscribed, displays the current subscription data on the form
    const { email, emailFrequency, isSubscribed } = subscriberData
    if (isSubscribed) {
      this.setState({
        frequency: emailFrequency,
        email,
        form: {
          ...this.state.form,
          email: {
            ...this.state.email,
            value: email,
          },
          checkbox: {
            option: emailFrequency,
          },
          formIsValid: true,
        },
      })
    }
  }

  redirectToAccountSummary = () => {
    this.props.history.push('/account')
  }

  onSubmitBtnHandler = async event => {
    event.preventDefault()
    logger.log('Submit btnHandler')
    const { subscriberData, userData } = this.props
    const { frequency, form } = this.state
    let data = {
      address: userData.address,
      emailFrequency: frequency,
      email: form.email.value,
      id: subscriberData.id,
    }

    this.setState(
      {
        displayMsg: displayTexts.GENERATING_SUBSCRIPTION,
      },
      async () => {
        if (subscriberData && subscriberData.isSubscribed) {
          // Updates subscription
          await this.updateSubscription(data)
        }
        if (subscriberData && !subscriberData.isSubscribed) {
          // Creates subscription
          await this.generateSubscription(data)
        }
        this.sendToast(null, () => {
          this.redirectToAccountSummary()
        })
      },
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

  generateSubscription = async data => {
    try {
      const { subscriberUser } = this.props
      const displayMsg = displayTexts.WELCOME_NEW_SUBSCRIBER
      await subscriberUser(data)
      this.setState({
        error: false,
        displayMsg,
        displaySubscriptionModal: false,
      })
    } catch (exception) {
      const displayMsg = exception.displayMsg || displayTexts.FAIL_NO_REASON
      this.setState({
        displayMsg,
        error: true,
        displaySubscriptionModal: false,
      })
    }
  }

  updateSubscription = async data => {
    try {
      const { updateUserSubscription } = this.props
      const displayMsg = displayTexts.SUBSCRIPTION_UPDATED
      await updateUserSubscription(data)
      this.setState({
        error: false,
        displayMsg,
        displaySubscriptionModal: false,
      })
    } catch (exception) {
      const displayMsg = exception.displayMsg || displayTexts.FAIL_NO_REASON
      this.setState({
        displayMsg,
        error: true,
        displaySubscriptionModal: false,
      })
    }
  }

  onUnsubscribeBtnHandler = async () => {
    try {
      const { unsubscribeUser } = this.props
      const displayMsg = displayTexts.UNSUBSCRIPTION_SUCCESSFUL
      await unsubscribeUser()
      this.setState(
        {
          error: false,
          displayMsg,
          displaySubscriptionModal: false,
        },
        () =>
          this.sendToast(1000, () => {
            this.redirectToAccountSummary()
          }),
      )
    } catch (exception) {
      logger.log('Exception on deleteSubscription', exception)
      if (exception && exception.response && exception.response.status === 404) {
        // User with that id not found
        this.setState(
          {
            error: true,
            displayMsg: displayTexts.WELCOME_NOT_SUBSCRIBED,
            displaySubscriptionModal: false,
          },
          () => this.sendToast(),
        )
      } else {
        this.setState(
          {
            error: true,
            displayMsg: displayTexts.FAIL_NO_REASON,
            displaySubscriptionModal: false,
          },
          () => this.sendToast(),
        )
      }
    }
  }

  sendToast = (toastTime = 2000, callback) => {
    let displayMsg = this.state.displayMsg

    if (!toast.isActive(this.state.toastId)) {
      if (this.state.error) {
        toast.error(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: toastTime,
          toastId: this.state.toastId,
          onClose: callback,
        })
      } else {
        toast.success(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: toastTime,
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
    // Validates that the new frequency is supported and updates the form
    if (isFrequencySupported(newFrequency)) {
      this.setState({
        frequency: newFrequency,
        form: {
          ...this.state.form,
          checkbox: {
            option: newFrequency,
          },
        },
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
            onUnsubscribeBtnHandler={this.onUnsubscribeBtnHandler}
            frequencyChangedHandler={this.frequencyChangedHandler}
            isSubscribed={subscriberData && subscriberData.isSubscribed}
          />
        )}
        <ToastContainer autoClose={5000} />
      </>
    )
  }
}
