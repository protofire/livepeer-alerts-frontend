import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardAvatar from '../../../Components/Common/Card/CardAvatar'

configure({ adapter: new Adapter() })

describe('CardAvatar test ', () => {
  it(`Should render cardAvatar`, () => {
    const wrapper = mount(
      <CardAvatar>
        <div />
      </CardAvatar>
    )
    const cardAvatar = wrapper.find('CardAvatar')
    expect(cardAvatar).toHaveLength(1)
  })
})
