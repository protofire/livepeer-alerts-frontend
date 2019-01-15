import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Header from '../../../src/Components/Common/Header/Header'

configure({ adapter: new Adapter() })

const props = {
  routes: [
    {
      views: {
        path: '',
        name: ''
      }
    }
  ],
  location: {
    pathname: '/'
  }
}

describe('Header test ', () => {
  it(`Header has appBar`, () => {
    const wrapper = mount(<Header {...props} />)
    const input = wrapper.find('AppBar')
    expect(input).toHaveLength(1)
  })
  it(`Header has toolbar`, () => {
    const wrapper = mount(<Header {...props} />)
    const input = wrapper.find('Toolbar')
    expect(input).toHaveLength(1)
  })
})
