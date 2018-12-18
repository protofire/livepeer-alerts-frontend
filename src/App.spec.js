import React from 'react'
import { mount } from 'enzyme'
import App from '../src/App'

it('renders welcome message', () => {
  const wrapper = mount(<App />)
  const welcome = 'Hello LivePeer Alerts!'
  expect(wrapper.contains(welcome)).toEqual(true)
})
