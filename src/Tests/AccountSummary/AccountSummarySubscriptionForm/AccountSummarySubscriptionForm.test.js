import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as displayTexts from '../../../Components/AccountSummary/AccountSummaryTexts'
import { AccountSummarySubscriptionForm } from '../../../Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummarySubscriptionForm'
import render from 'react-test-renderer'
import axiosInstance from '../../../util/axios'

configure({ adapter: new Adapter() })

const props = {
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE'
  }
}

const response = {
  data: {
    activated: true,
    _id: 1,
    createdAt: ''
  }
}
describe('AccountSummarySubscriptionForm Test', () => {
  it('Renders AccountSummarySubscriptionForm and match snapshot', () => {
    // Given

    let wrapper = render.create(<AccountSummarySubscriptionForm {...props} />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })

  it('Shows Welcome Message', () => {
    // Given
    const message = 'Subscribe:'

    //When
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)

    //Then
    expect(wrapper.contains(message)).toEqual(true)
  })

  it('Renders Input email text', () => {
    // Given
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)

    //When
    const input = wrapper.find('.InputElement')

    //Then
    expect(input.length).toEqual(1)
  })

  it('Renders Subscribe btn', () => {
    // Given
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)

    //When
    const buttons = wrapper.find('button')

    //Then
    expect(buttons.length).toEqual(2)
  })

  it('Validity false is input no email', () => {
    //Given
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    const value = 'testnoemail'
    const rules = {
      required: true,
      emailCheck: true
    }

    //When
    const validity = wrapper.instance().checkValidity(value, rules)

    //Then
    expect(validity).toBe(false)
  })

  it('Validity true is input email', () => {
    // Given
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    const value = 'testemailok@test.com'
    const rules = {
      required: true,
      emailCheck: true
    }

    // When
    const validity = wrapper.instance().checkValidity(value, rules)

    // Then
    expect(validity).toBe(true)
  })

  it('Displays welcome subscriber if the user subscribed', async () => {
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)
    const emailTest = 'test@test.com'
    axiosInstance.post = jest.fn().mockResolvedValue(response)
    let emailInput = wrapper.find('input').at(1)
    emailInput.simulate('change', { target: { value: emailTest } })
    await wrapper.instance().generateSubscription(null, null)
    let welcomeMsg = displayTexts.WELCOME_NEW_SUBSCRIBER
    expect(wrapper.state().displayMsg).toBe(welcomeMsg)
  })
})
