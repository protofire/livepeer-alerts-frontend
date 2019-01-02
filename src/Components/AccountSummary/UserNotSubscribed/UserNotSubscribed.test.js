import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserNotSubscribed from './UserNotSubscribed'
import * as component from 'enzyme'

configure({ adapter: new Adapter() })

describe('Renders userNotSubscribed Component', () => {
  it('Renders welcome message', () => {
    const message = 'Welcome to Livepeer!'
    let wrapper = shallow(<UserNotSubscribed />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Renders subscription button', () => {
    let props = {
      onSubscribeBtnHandler: () => {}
    }
    let wrapper = shallow(<UserNotSubscribed {...props} />)
    expect(wrapper.contains(<button onClick={props.onSubscribeBtnHandler}>Subscribe</button>)).toBe(
      true
    )
  })
})
