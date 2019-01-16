import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as displayTexts from '../../Components/AccountSummary/AccountSummaryTexts'
import * as jest from 'jest'
import axios from 'axios'
import { AccountSummarySubscriptionForm } from '../../Components/AccountSummary/AccountSummarySubscriptionForm/AccountSummarySubscriptionForm'

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
jest.mock('axios')
describe('Render AccountSummarySubscriptionForm', () => {
  it('Shows Welcome Message', () => {
    const message = 'Subscribe:'
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Renders Input email text', () => {
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.find('.InputElement').length).toEqual(1)
  })
  it('Renders Subscribe btn', () => {
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.find('button').length).toEqual(1)
  })
  it('Validity false is input no email', () => {
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    const value = 'testnoemail'
    const rules = {
      required: true,
      emailCheck: true
    }
    expect(wrapper.instance().checkValidity(value, rules)).toBe(false)
  })
  it('Validity true is input email', () => {
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    const value = 'testemailok@test.com'
    const rules = {
      required: true,
      emailCheck: true
    }
    expect(wrapper.instance().checkValidity(value, rules)).toBe(true)
  })
  it('Displays welcome subscriber if the user subscribed', async () => {
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)
    const emailTest = 'test@test.com'
    axios.post.mockResolvedValue(response)
    let emailInput = wrapper.find('input').at(1)
    emailInput.simulate('change', { target: { value: emailTest } })
    await wrapper.instance().generateSubscription(null, null)
    let welcomeMsg = displayTexts.WELCOME_NEW_SUBSCRIBER + emailTest
    expect(wrapper.state().displayMsg).toBe(welcomeMsg)
  })
})
