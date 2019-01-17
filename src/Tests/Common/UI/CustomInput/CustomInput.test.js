import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import CustomInput from '../../../../Components/Common/UI/CustomInput/CustomInput'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })
describe('Custom input test', () => {
  it(`Renders custom input'`, () => {
    // Given
    const wrapper = shallow(<CustomInput />)

    // When
    const wrapperFound = wrapper.find('CustomInput')

    // Then
    expect(wrapperFound).toHaveLength(1)
  })
  it(`Custom input has props'`, () => {
    // Given
    const wrapper = mount(<CustomInput />)

    // When
    const props = wrapper.props()

    // Then
    expect.anything(props)
  })

  it(`Should render a Custom Input and check snapshot`, () => {
    // Given
    let wrapper = render.create(<CustomInput />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
