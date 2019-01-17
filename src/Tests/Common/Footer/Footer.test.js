import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import Footer from '../../../Components/Common/Footer/Footer'
import render from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

configure({ adapter: new Adapter() })

describe('Footer test ', () => {
  it(`Should render footer and check snapshot`, () => {
    // Given
    let wrapper = render.create(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>
    )

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
