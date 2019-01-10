import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Spinner from './Spinner'

configure({ adapter: new Adapter() })

describe('Spinner test ', () => {
  it(`Should render spinner`, () => {
    const wrapper = mount(<Spinner />)
    const findSpinner = wrapper.find('CircularProgress')
    expect(findSpinner).toHaveLength(1)
  })
})
