import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardIcon from '../../../../Components/Common/UI/Card/CardIcon'

configure({ adapter: new Adapter() })

describe('cardIcon test ', () => {
  it(`Should render cardIcon`, () => {
    const wrapper = mount(
      <CardIcon>
        <div />
      </CardIcon>
    )
    const cardAvatar = wrapper.find('CardIcon')
    expect(cardAvatar).toHaveLength(1)
  })
})
