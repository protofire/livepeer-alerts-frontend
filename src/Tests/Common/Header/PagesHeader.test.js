import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import PagesHeader from '../../../Components/Common/Header/PagesHeader'
import render from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

configure({ adapter: new Adapter() })

describe('Pages Header test ', () => {
  it(`Should render Pages Header and check snapshot`, () => {
    // Given
    let wrapper = render.create(
      <MemoryRouter initialEntries={['/']}>
        <PagesHeader />
      </MemoryRouter>
    )

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
