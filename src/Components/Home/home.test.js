import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { HomeComponent } from './home'
import * as failReasons from '../Common/Hoc/Web3Provider/Web3FailReasons'
import * as texts from '../Common/UI/Texts/Texts'

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
  it('Renders error message if user not auth', () => {
    const toastFn = jest.fn()
    let props = {
      web3: [],
      userData: {
        authenticated: false,
        reason: failReasons.NO_PERMISSIONS,
      },
      render: true,
      toastOpenedHandlerTest: toastFn
    }
    let wrapper = shallow(<HomeComponent {...props} />)
    expect(toastFn).toBeCalledWith(texts.NO_PERMISSIONS)
  })
  it('Renders error message if user does not have Metamask installed', () => {
    const toastFn = jest.fn()
    let props = {
      web3: null,
      render: true,
      toastOpenedHandlerTest: toastFn,
      userData: {
        authenticated: false,
        reason: failReasons.NO_WEB3
      }
    }
    let wrapper = shallow(<HomeComponent {...props} />)
    expect(toastFn).toBeCalledWith(texts.NO_WEB3)
  })
})
