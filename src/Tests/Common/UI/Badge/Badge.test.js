import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Badge from '../../../../Components/Common/UI/Badge/Badge'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('Badge test', () => {
  it(`Should render a Badge and check snapshot`, () => {
    // Given
    let wrapper = render.create(<Badge />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
