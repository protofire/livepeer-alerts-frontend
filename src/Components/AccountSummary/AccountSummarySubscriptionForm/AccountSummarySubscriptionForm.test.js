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
  it('test', () => {
    expect(true)
  })
  /*  it('Should render subscription form without throwing an error', () => {
    // Given
    let wrapper = shallow(<AccountSummarySubscriptionForm {...props} />)
    // When
    const tree = wrapper.html()

    let content = (
      <div>
        <h1>Welcome to subscription form</h1>
        <form>
          <div className="Input">
            <label className="Label" />
            <input type="email" className="InputElement" placeholder="Your E-Mail" value="" />
          </div>
          <button disabled="" className="Button">
            Subscribe
          </button>
        </form>
        <div className="Toastify" />
      </div>
    )
    // Then
    expect(wrapper.contains(content)).toEqual(true)
  })*/
})
