import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardHeader from '../../../../Components/Common/UI/Card/CardHeader'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('CardHeader test', () => {
  it(`Should render cardHeader`, () => {
    // Given
    const wrapper = mount(
      <CardHeader>
        <div />
      </CardHeader>
    )

    // When
    const cardAvatar = wrapper.find('CardHeader')

    // Then
    expect(cardAvatar).toHaveLength(1)
  })

  it(`Should render a cardHeader and check snapshot`, () => {
    // Given
    let wrapper = render.create(<CardHeader />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
