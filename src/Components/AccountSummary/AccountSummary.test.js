import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as jest from 'jest'
import axios from 'axios'
import { AccountSummaryComponent } from './AccountSummary'
import Spinner from '../Common/UI/Spinner/Spinner'
import AccountSummaryHome from './AccountSummaryHome/AccountSummaryHome'
import * as displayTexts from './AccountSummaryTexts'

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

const response = {
  data: {
    activated: 0,
    _id: 0,
    email: 'test@altoros.com',
    address: '0x9D45EECe52F0b8Ae0238dCb0a42da9928f4b9c4f',
    frequency: 'weekly',
    activatedCode: '741208730162732000000',
    createdAt: '2019-01-02T14:51:17.800Z',
    summary: {
      bondedAmount: 0,
      fees: 0,
      status: 'Bounded',
      lastClaimRound: 0,
      startRound: 0,
      withdrawRound: 0
    },
    balance: 0
  }
}

jest.mock('axios')
describe('Renders AccountSummary data', () => {
  it('Renders Loading spinner when fetching data', () => {
    let wrapper = mount(<AccountSummaryComponent {...props} />)
    wrapper.update()
    expect(wrapper.contains(<Spinner />)).toBe(true)
  })
})
