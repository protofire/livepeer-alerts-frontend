import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import GridContainer from '../../../../Components/Common/UI/Grid/GridContainer'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('GridContainer test', () => {
  it(`Should render an Input and check snapshot`, () => {
    // Given
    let wrapper = render.create(<GridContainer />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
