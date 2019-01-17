import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Spinner from '../../../../Components/Common/UI/Spinner/Spinner'
configure({ adapter: new Adapter() })

describe('Spinner test ', () => {
  it(`Should render spinner`, () => {
    // Given
    const wrapper = mount(<Spinner />)

    // When
    const findSpinner = wrapper.find('CircularProgress')

    // Then
    expect(findSpinner).toHaveLength(1)
  })
})
