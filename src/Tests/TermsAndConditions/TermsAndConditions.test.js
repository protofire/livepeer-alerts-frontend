import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TermsAndConditionsComponent from '../../Components/TermsAndConditions/TermsAndConditions'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('Renders terms and conditions', () => {
  it('Shows terms and conditions and check snapshot', () => {
    // Given
    let wrapper = render.create(<TermsAndConditionsComponent />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
