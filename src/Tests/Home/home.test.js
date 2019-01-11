import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { HomeComponent } from '../../Components/Home/home'
import * as texts from '../../Components/Common/UI/Texts/Texts'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('Renders home message', () => {
  it('Renders home message if user auth', () => {
    // Given
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
    let wrapper = render.create(<HomeComponent {...props} />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })

  it('Renders error message if user not auth', () => {
    const toastFn = jest.fn()
    let props = {
      web3: [],
      userData: {
        authenticated: false
      },
      render: true,
      location: {
        state: {
          displayMsg: texts.NO_PERMISSIONS,
          error: true
        }
      },
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
        authenticated: false
      },
      location: {
        state: {
          displayMsg: texts.NO_WEB3,
          error: true
        }
      }
    }
    let wrapper = shallow(<HomeComponent {...props} />)
    expect(toastFn).toBeCalledWith(texts.NO_WEB3)
  })
})
