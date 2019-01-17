import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as jest from 'jest'
import axios from 'axios'
import HomeCard from '../../../Components/Home/HomeCard/HomeCard'
import render from 'react-test-renderer'

configure({ adapter: new Adapter() })

const props = {
  summary: {
    bondedAmount: 0,
    fees: 0,
    status: 'Bonded',
    lastClaimRound: 0,
    startRound: 0,
    withdrawRound: 0
  },
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE',
    email: 'test@altoros.com',
    frequency: 'weekly',
    ethBalance: 'ethBalance',
    activated: 1,
    isSubscribed: true
  },
  render: true,
  onSubscriptionChangeHandler: () => {},
  onUnSubscribeBtnHandler: () => {}
}

const response = {
  data: {
    bondedAmount: 0,
    fees: 0,
    lastClaimRound: 0,
    startRound: 0,
    status: 0,
    withdrawRound: 0,
    totalStake: 0
  }
}

jest.mock('axios')

describe('HomeCard test', () => {
  it('HomeCard test', () => {
    // Given
    let wrapper = render.create(<HomeCard {...props} />)

    // When
    const tree = wrapper.toJSON()

    // Then
    expect(tree).toMatchSnapshot()
  })
})
