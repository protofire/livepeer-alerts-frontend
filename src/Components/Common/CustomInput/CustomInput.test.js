import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CustomInput from './CustomInput'

configure({ adapter: new Adapter() })

describe('CustomInput test ', () => {
  it(`Should render custom input`, () => {
    const wrapper = mount(<CustomInput />)
    const input = wrapper.find('Input')
    expect(input).toHaveLength(1)
  })
})
