import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import CustomInput from '../../../../Components/Common/UI/CustomInput/CustomInput'

configure({ adapter: new Adapter() })
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
