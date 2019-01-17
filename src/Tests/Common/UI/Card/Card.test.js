import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Card from '../../../../Components/Common/UI/Card/Card'
import Spinner from '../../../../Components/Common/UI/Spinner/Spinner'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('Card test', () => {
  it(`Should render a Card and check snapshot`, () => {
    // Given
    let wrapper = render.create(
      <Card className="AccountSummaryCard">
        <Spinner displayMsg="Test" />
      </Card>
    )

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
