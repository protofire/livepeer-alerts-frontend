import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as jest from 'jest'
import axios from 'axios'
import { AccountSummaryComponent } from './AccountSummary'
import Spinner from '../Common/UI/Spinner/Spinner'

configure({ adapter: new Adapter() })

const props = {
  summary: {
    bondedAmount: 0,
    fees: 0,
    status: 'Bounded',
    lastClaimRound: 0,
    startRound: 0,
    withdrawRound: 0
  },
  userData: {
    address: '0x4d3F9184Fc32A43BAD2641b1536B52a076FBBDcE',
    email: 'test@altoros.com',
    frequency: 'weekly',
    ethBalance: 'ethBalance',
    activated: 1
  },
  render: true,
  onSubscriptionChangeHandler: () => {},
  onUnSubscribeBtnHandler: () => {},
  web3: []
}

jest.mock('axios')
describe('test', () => {
  it('test', () => {
    expect(true)
  })
})
