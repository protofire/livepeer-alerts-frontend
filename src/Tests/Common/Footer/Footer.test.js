import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import Footer from '../../../Components/Common/Footer/Footer'

configure({ adapter: new Adapter() })

describe('Footer test ', () => {
  it(`Should render footer'`, () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.find('Footer')).toHaveLength(1)
  })
})
