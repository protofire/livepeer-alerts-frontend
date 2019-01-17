import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Header from '../../../Components/Common/Header/Header'
import render from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

configure({ adapter: new Adapter() })

const props = {
  routes: [
    {
      views: {
        path: '',
        name: ''
      }
    }
  ],
  location: {
    pathname: '/'
  }
}

describe('Header test ', () => {
  it(`Header has appBar`, () => {
    // Given
    const wrapper = mount(<Header {...props} />)

    // When
    const input = wrapper.find('AppBar')

    // Then
    expect(input).toHaveLength(1)
  })

  it(`Header has toolbar`, () => {
    // Given
    const wrapper = mount(<Header {...props} />)

    // When
    const input = wrapper.find('Toolbar')

    // Then
    expect(input).toHaveLength(1)
  })

  it(`Should render Header and check snapshot`, () => {
    // Given
    let wrapper = render.create(
      <MemoryRouter initialEntries={['/']}>
        <Header {...props} />
      </MemoryRouter>
    )

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
