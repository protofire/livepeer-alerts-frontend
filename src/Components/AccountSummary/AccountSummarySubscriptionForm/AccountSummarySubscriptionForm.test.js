import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AccountSummarySubscriptionForm } from './AccountSummarySubscriptionForm'

configure({ adapter: new Adapter() })

const props = {
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE'
  }
}

describe('Render AccountSummarySubscriptionForm', () => {
  it('Should render subscription form without throwing an error', () => {
    // Given
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    // When
    const tree = wrapper.html()
    // Then
    expect(tree).toMatchSnapshot()
  })
})
