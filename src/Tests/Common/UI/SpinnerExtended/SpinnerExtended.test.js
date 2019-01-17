import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import SpinnerExtended from '../../../../Components/Common/UI/SpinnerExtended/SpinnerExtended'
import render from 'react-test-renderer'
configure({ adapter: new Adapter() })

describe('Spinner extended test ', () => {
  it(`Should render spinner extended`, () => {
    // Given
    const wrapper = mount(<SpinnerExtended displayMsg="test" />)

    // When
    const findSpinner = wrapper.find('CircularProgress')

    // Then
    expect(findSpinner).toHaveLength(1)
  })

  it(`Should render an spinner extended and check snapshot`, () => {
    // Given
    let wrapper = render.create(<SpinnerExtended displayMsg="test" />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
