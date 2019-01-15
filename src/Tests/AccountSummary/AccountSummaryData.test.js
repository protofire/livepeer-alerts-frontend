import React from 'react'
import { configure, mount } from 'enzyme'
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
    const message = 'Bonded amount'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[1] === message).toEqual(true)
  })
  it('Shows Fees', () => {
    const message = 'Earned from delegate fees'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[3] === message).toEqual(true)
  })
  it('Shows Status', () => {
    const message = 'Status'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[5] === message).toEqual(true)
  })
  /*
  it('Shows LastClaimRound', () => {
    const message = 'LastClaimRound'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[7] === message).toEqual(true)
  })
  it('Shows StartRound', () => {
    const message = 'StartRound'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[9] === message).toEqual(true)
  })
  it('Shows WithdrawRound', () => {
    const message = 'WithdrawRound'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[11] === message).toEqual(true)
  })
  */
})
