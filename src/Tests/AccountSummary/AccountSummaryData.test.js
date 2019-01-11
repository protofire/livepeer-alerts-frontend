import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AccountSummaryData from '../../Components/AccountSummary/AccountSummaryData/AccountSummaryData'

configure({ adapter: new Adapter() })

const props = {
  summary: {
    bondedAmount: 0,
    fees: 0,
    status: 'Bounded',
    lastClaimRound: 0,
    startRound: 0,
    withdrawRound: 0
  }
}

describe('Renders account summary data', () => {
  it('Shows bondedAmount', () => {
    const message = 'BondedAmount'
    let wrapper = shallow(<AccountSummaryData {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows Fees', () => {
    const message = 'Fees'
    let wrapper = shallow(<AccountSummaryData {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows Status', () => {
    const message = 'Status'
    let wrapper = shallow(<AccountSummaryData {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows LastClaimRound', () => {
    const message = 'LastClaimRound'
    let wrapper = shallow(<AccountSummaryData {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows StartRound', () => {
    const message = 'StartRound'
    let wrapper = shallow(<AccountSummaryData {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
  it('Shows WithdrawRound', () => {
    const message = 'WithdrawRound'
    let wrapper = shallow(<AccountSummaryData {...props} />)
    expect(wrapper.contains(message)).toEqual(true)
  })
})
