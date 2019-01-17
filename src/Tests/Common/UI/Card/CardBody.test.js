import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardBody from '../../../../Components/Common/UI/Card/CardBody'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('CardBody test', () => {
  it(`Should render cardBody`, () => {
    // Given
    const wrapper = mount(<CardBody />)

    //When
    const cardBody = wrapper.find('CardBody')

    // Then
    expect(cardBody).toHaveLength(1)
  })

  it(`Should render a CardBody and check snapshot`, () => {
    // Given
    let wrapper = render.create(<CardBody />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
