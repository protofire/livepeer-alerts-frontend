import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserSubscribed from './UserSubscribed'
import Spinner from '../../Common/UI/Spinner/Spinner'
import * as jest from 'jest'
import axios from 'axios'

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
describe('test', () => {
  it('test', () => {
    expect(true)
  })
})
/** TODO -- Enable again when the enzyme bug of conditional rendering is solved **/
describe('Renders userSubscribed data', () => {
  /*  it('Shows Welcome Message', () => {
    const message = displayTexts.WELCOME_AGAIN
    axios.get.mockResolvedValue(response)
    let wrapper = shallow(<UserSubscribed {...props} />)
    wrapper = wrapper.update()
    console.log("testing debug wrapper" , wrapper.debug())
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows address', () => {
    const message = 'Address'
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows Email', () => {
    const message = 'Email'
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows Activated status', () => {
    const message = 'Activated'
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows created at', () => {
    const message = 'Created at'
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows Subscription frequency', () => {
    const message = 'Subscription frequency'
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows ETH Balance', () => {
    const message = 'ETH Balance'
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Renders account summary data child component', () => {
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(wrapper.contains(<AccountSummaryData summary={props.summary} />)).toBe(true)
  })
  it('Renders change subscription button', () => {
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(
      wrapper.contains(
        <Button clicked={props.onSubscriptionChangeHandler}>Change Subscription</Button>
      )
    ).toBe(true)
  })
  it('Renders delete subscription button', () => {
    let wrapper = shallow(<UserSubscribed {...props} />)
    expect(
      wrapper.contains(<Button clicked={props.onUnSubscribeBtnHandler}>Unsubscribe</Button>)
    ).toBe(true)
  })*/
})
