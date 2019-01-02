import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import Button from './Button'

configure({ adapter: new Adapter() })

describe('Spinner test ', () => {
  it(`should render Button component with class name 'Button'`, () => {
    const wrapper = shallow(<Button />)
    const visitorShortcutsWrapper = wrapper.find('.Button')
    expect(visitorShortcutsWrapper).toHaveLength(1)
  })
})
