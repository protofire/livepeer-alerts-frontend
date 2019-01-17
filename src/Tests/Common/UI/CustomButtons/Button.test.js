import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Button from '../../../../Components/Common/UI/CustomButtons/Button'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('Button test', () => {
  it(`Should render a Button and check snapshot`, () => {
    // Given
    let wrapper = render.create(<Button>Test</Button>)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
