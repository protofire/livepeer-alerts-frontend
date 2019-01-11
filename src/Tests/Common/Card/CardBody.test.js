import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import CardBody from '../../../Components/Common/UI/Card/CardBody'

configure({ adapter: new Adapter() })

describe('CardBody test ', () => {
  it(`Should render cardBody`, () => {
    const wrapper = mount(<CardBody />)
    const cardBody = wrapper.find('CardBody')
    expect(cardBody).toHaveLength(1)
  })
})
