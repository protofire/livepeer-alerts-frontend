import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardHeader from '../../../Components/Common/Card/CardHeader'

configure({ adapter: new Adapter() })

describe('cardHeader test ', () => {
  it(`Should render cardHeader`, () => {
    const wrapper = mount(
      <CardHeader>
        <div />
      </CardHeader>
    )
    const cardAvatar = wrapper.find('CardHeader')
    expect(cardAvatar).toHaveLength(1)
  })
})
