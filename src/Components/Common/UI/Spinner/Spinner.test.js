import React from 'react'
import Spinner from './Spinner'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

configure({ adapter: new Adapter() })

describe('Spinner test ', () => {
  it(`should render Spinner component with class name 'Loader'`, () => {
    const wrapper = shallow(<Spinner />)
    const visitorShortcutsWrapper = wrapper.find('CircularProgress')
    expect(visitorShortcutsWrapper).toHaveLength(1)
  })
})
