import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardFooter from '../../../../Components/Common/UI/Card/CardFooter'

configure({ adapter: new Adapter() })

describe('cardFooter test ', () => {
  it(`Should render cardFooter`, () => {
    const wrapper = mount(
      <CardFooter>
        <div />
      </CardFooter>
    )
    const cardAvatar = wrapper.find('CardFooter')
    expect(cardAvatar).toHaveLength(1)
  })
})
