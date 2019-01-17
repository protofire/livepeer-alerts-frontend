import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardAvatar from '../../../../Components/Common/UI/Card/CardAvatar'
import render from 'react-test-renderer'
import Spinner from '../../../../Components/Common/UI/Spinner/Spinner'

configure({ adapter: new Adapter() })

describe('CardAvatar test', () => {
  it(`Should render cardAvatar`, () => {
    // Given
    const wrapper = mount(
      <CardAvatar>
        <div />
      </CardAvatar>
    )

    //When
    const cardAvatar = wrapper.find('CardAvatar')

    //Then
    expect(cardAvatar).toHaveLength(1)
  })

  it(`Should render a CardAvatar and check snapshot`, () => {
    // Given
    let wrapper = render.create(
      <CardAvatar>
        <Spinner displayMsg="Test" />
      </CardAvatar>
    )

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
