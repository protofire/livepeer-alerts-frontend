import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import InfoArea from '../../../../Components/Common/UI/InfoArea/InfoArea'
import render from 'react-test-renderer'
import Notifications from '@material-ui/icons/NotificationsActive'

configure({ adapter: new Adapter() })

describe('InfoArea test', () => {
  it(`Should render an InfoArea and check snapshot`, () => {
    // Given
    let wrapper = render.create(
      <InfoArea
        title="Pro-active alert notifications"
        icon={Notifications}
        description="We provide pro-active alert notifications that will help LPT token holders to be updated about how the delegates are performing in near real time"
        iconColor="rose"
      />
    )

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
