import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { HomeComponent } from './home'

configure({ adapter: new Adapter() })

describe('Renders home message', () => {
  it('Renders home message if user auth', () => {
    const message = 'Hello LivePeer Alerts!'
    let props = {
      web3: [],
      userData: {
        authenticated: true,
        reason: '',
        address: 123,
        currentNetwork: 123
      },
      render: false
    }
    let wrapper = shallow(<HomeComponent {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
})
