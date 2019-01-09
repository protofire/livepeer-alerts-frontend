import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AccountSummarySubscriptionForm } from './AccountSummarySubscriptionForm'

configure({ adapter: new Adapter() })

const props = {
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE'
  }
}

describe('Render AccSummarySubscriptionForm', () => {
  it('test', () => {
    expect(true)
  })
  it('Shows Welcome Message', () => {
    const message = 'Welcome to subscription form'
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Renders Input email text', () => {
    let wrapper = mount(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.find('.InputElement').length).toEqual(1)
  })
  it('Renders Subscribe btn', () => {
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.find('button').length).toEqual(1)
  })
})
