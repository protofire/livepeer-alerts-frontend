import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AccountSummarySubscriptionFormDisplay from '../../Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummaryFormDisplay/AccountSummarySubscriptionFormDisplay'
import * as displayTexts from '../../Components/AccountSummary/AccountSummaryTexts'

configure({ adapter: new Adapter() })

const props = {
  form: {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      validation: {
        required: true,
        emailCheck: true
      },
      value: '',
      touched: false,
      valid: false
    },
    formIsValid: false
  },
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE'
  },
  address: null,
  frequency: 'daily',
  render: false,
  toastId: '1',
  displayMsg: displayTexts.LOADING_SUBSCRIPTION_DATA
}

describe('Render AccountSummarySubscriptionForm', () => {
  it('Shows Welcome Message', () => {
    const message = 'Subscribe:'
    let wrapper = mount(<AccountSummarySubscriptionFormDisplay {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Renders Input email text', () => {
    let wrapper = mount(<AccountSummarySubscriptionFormDisplay {...props} />)
    expect(wrapper.find('.InputElement').length).toEqual(1)
  })
  it('Renders Subscribe btn', () => {
    const message = 'Subscribe'
    let wrapper = mount(<AccountSummarySubscriptionFormDisplay {...props} />)
    expect(wrapper.find('RegularButton').length).toEqual(1)
    expect(wrapper.contains(message)).toEqual(true)
  })
})
