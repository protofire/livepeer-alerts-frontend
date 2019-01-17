import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardIcon from '../../../../Components/Common/UI/Card/CardIcon'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('CardIcon test', () => {
  it(`Should render cardIcon`, () => {
    // Given
    const wrapper = mount(
      <CardIcon>
        <div />
      </CardIcon>
    )

    // When
    const cardAvatar = wrapper.find('CardIcon')

    // Then
    expect(cardAvatar).toHaveLength(1)
  })

  it(`Should render a cardIcon and check snapshot`, () => {
    // Given
    let wrapper = render.create(<CardIcon />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
