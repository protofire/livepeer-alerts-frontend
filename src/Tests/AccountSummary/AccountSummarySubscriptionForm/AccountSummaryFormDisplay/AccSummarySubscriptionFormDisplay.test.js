import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AccountSummarySubscriptionFormDisplay from '../../../../Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummaryFormDisplay/AccountSummarySubscriptionFormDisplay'
import * as displayTexts from '../../../../Components/AccountSummary/AccountSummaryTexts'
import render from 'react-test-renderer'

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

describe('AccountSummarySubscriptionFormDisplay Tests', () => {
  it('Renders AccountSummarySubscriptionFormDisplay and match snapshot', () => {
    // Given

    let wrapper = render.create(<AccountSummarySubscriptionFormDisplay {...props} />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })

  it('Shows Welcome Message', () => {
    //Given
    const message = 'Subscribe:'

    // When
    let wrapper = mount(<AccountSummarySubscriptionFormDisplay {...props} />)

    //Then
    expect(wrapper.contains(message)).toEqual(true)
  })

  it('Renders Input email text', () => {
    // Given
    let wrapper = mount(<AccountSummarySubscriptionFormDisplay {...props} />)

    //When
    const input = wrapper.find('.InputElement')

    //Then
    expect(input.length).toEqual(1)
  })

  it('Renders Subscribe btn', () => {
    //Given
    const message = 'Subscribe'
    let wrapper = mount(<AccountSummarySubscriptionFormDisplay {...props} />)

    //When
    const buttons = wrapper.find('RegularButton')
    const messages = wrapper.contains(message)

    //Then
    expect(buttons.length).toEqual(2)
    expect(messages).toEqual(true)
  })
})
