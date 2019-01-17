import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardText from '../../../../Components/Common/UI/Card/CardText'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('CardText test', () => {
  it(`Should render cardText`, () => {
    // Given
    const wrapper = mount(
      <CardText>
        <div />
      </CardText>
    )

    // When
    const cardText = wrapper.find('CardText')

    // Then
    expect(cardText).toHaveLength(1)
  })

  it(`Should render a cardText and check snapshot`, () => {
    // Given
    let wrapper = render.create(<CardText />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
