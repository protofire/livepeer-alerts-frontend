import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import CustomInput from './CustomInput'

configure({ adapter: new Adapter() })

const props = {
  classes: {},
  className: '',
  children: [],
  plain: false,
  profile: false,
  pricing: false,
  testimonial: false,
  stats: false,
  chart: false,
  product: false
}

describe('Custom input  ', () => {
  it(`Renders custom input'`, () => {
    const wrapper = shallow(<CustomInput />)
    expect(wrapper.find('CustomInput')).toHaveLength(1)
  })
  it(`Custom input has props'`, () => {
    const wrapper = mount(<CustomInput />)
    expect.anything(wrapper.props())
  })
})
