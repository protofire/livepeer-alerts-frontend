import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as jest from 'jest'
import axios from 'axios'
import * as displayTexts from '../../../Components/AccountSummary/AccountSummaryTexts'
import AccountSummaryHome from '../../../Components/AccountSummary/AccountSummaryHome/AccountSummaryHome'
import AccountSummaryData from '../../../Components/AccountSummary/AccountSummaryData/AccountSummaryData'

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
describe('Renders userSubscribed data', () => {
  it('Shows Welcome Message', () => {
    const message = 'Welcome 0x4d3F91...76FBBDcE'
    axios.get.mockResolvedValue(response)
    let wrapper = mount(<AccountSummaryHome {...props} />)
    wrapper = wrapper.update()
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows address', () => {
    const message = 'Address'
    let wrapper = mount(<AccountSummaryHome {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows ETH Balance', () => {
    const message = 'ETH Balance'
    let wrapper = mount(<AccountSummaryHome {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows Livepeer Balance', () => {
    const message = 'LivePeer Balance'
    let wrapper = mount(<AccountSummaryHome {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Renders account summary data child component', () => {
    let wrapper = mount(<AccountSummaryHome {...props} />)
    expect(wrapper.contains(<AccountSummaryData summary={props.summary} />)).toBe(true)
  })
  it('Renders subscription button if user not auth', () => {
    const propsNotAuth = {
      ...props,
      userData: {
        ...props.userData,
        isSubscribed: false
      }
    }
    let wrapper = mount(<AccountSummaryHome {...propsNotAuth} />)
    let buttons = wrapper.find('Button')
    expect(buttons.length).toEqual(2)
    expect(buttons.at(0).contains('Subscribe via Telegram')).toEqual(true)
    expect(buttons.at(1).contains('Subscribe via Email')).toEqual(true)
  })
  it('Renders Unsubscription button if user is auth', () => {
    const propsNotAuth = {
      ...props,
      userData: {
        ...props.userData,
        isSubscribed: true
      }
    }
    let wrapper = mount(<AccountSummaryHome {...propsNotAuth} />)
    let buttons = wrapper.find('Button')
    expect(buttons.length).toEqual(2)
    expect(buttons.at(0).contains('Subscribe via Telegram')).toEqual(true)
    expect(buttons.at(1).contains('Unsubscribe')).toEqual(true)
  })
})
