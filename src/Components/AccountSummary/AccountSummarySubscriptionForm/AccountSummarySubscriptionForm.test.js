import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const props = {
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE'
  }
}
/*
describe('Render AccountSummarySubscriptionForm', () => {
  it('Renders subscription form', () =>{
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    expect(wrapper.contains(

    )).toBe(true)
  })
})
*/

describe('test', () => {
  it('test', () => {
    expect(true)
  })
})
