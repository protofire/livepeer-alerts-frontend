import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardFooter from '../../../../Components/Common/UI/Card/CardFooter'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('CardFooter test', () => {
  it(`Should render cardFooter`, () => {
    // Given
    const wrapper = mount(
      <CardFooter>
        <div />
      </CardFooter>
    )

    // When
    const cardAvatar = wrapper.find('CardFooter')

    //Then
    expect(cardAvatar).toHaveLength(1)
  })

  it(`Should render a cardFooter and check snapshot`, () => {
    // Given
    let wrapper = render.create(<CardFooter />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
