import React, { Component } from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import axios from 'axios'
import { toast } from 'react-toastify'
import Input from '../../Common/UI/Input/Input'
import Button from '../../Common/UI/Button/Button'

export class AccountSummarySubscriptionForm extends Component {
  state = {
    form: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        validation: {
          required: true
        },
        value: '',
        touched: false,
        valid: false
      },
      formIsValid: false
    },
    address: null,
    frequency: 'weekly'
  }

  componentDidMount() {
    this.setState({
      address: this.props.userData.address
    })
  }

  onSubmitBtnHandler = async event => {
    event.preventDefault()
    console.log('[AccountSummarySubscriptionForm.js] submit btnHandler')
    let response
    let data = {
      address: this.state.address,
      frequency: this.state.frequency,
      email: this.state.form.email.value
    }
    this.setState({
      render: false,
      displayMsg: displayTexts.LOADING_SUBSCRIPTION
    })
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
      /** TODO -- CHECK URL **/
      //this.props.history.push('/');
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

  checkValidity = (value, rules) => {
    let isValid = true
    if (!rules) {
      return true
    }
    console.log('checking validity with rules ', rules)
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.form
    }
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
      value: event.target.value
    }
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    )
    updatedFormElement.touched = true
    updatedForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    formIsValid = updatedForm[inputIdentifier].valid && formIsValid
    this.setState({ form: updatedForm, formIsValid: formIsValid })
  }

  render() {
    let content = (
      <>
        <h1>Welcome to subscription form</h1>
        <form onSubmit={this.onSubmitBtnHandler}>
          <Input
            elementType={this.state.form.email.elementType}
            elementConfig={this.state.form.email.elementConfig}
            value={this.state.form.email.value}
            invalid={!this.state.form.email.valid}
            shouldValidate={this.state.form.email.validation}
            touched={this.state.form.email.touched}
            changed={event => this.inputChangedHandler(event, 'email')}
          />
          <Button btnType="Success" disabled={!this.state.form.formIsValid}>
            Subscribe
          </Button>
        </form>
      </>
    )
    return <div>{content}</div>
  }
}
