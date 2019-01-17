import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import GridItem from '../../../../Components/Common/UI/Grid/GridItem'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('GridItem test', () => {
  it(`Should render a GridItem and check snapshot`, () => {
    // Given
    let wrapper = render.create(<GridItem />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
