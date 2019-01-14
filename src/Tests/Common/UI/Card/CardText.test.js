import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardText from '../../../../Components/Common/UI/Card/CardText'

configure({ adapter: new Adapter() })

describe('cardText test ', () => {
  it(`Should render cardText`, () => {
    const wrapper = mount(
      <CardText>
        <div />
      </CardText>
    )
    const cardAvatar = wrapper.find('CardText')
    expect(cardAvatar).toHaveLength(1)
  })
})
