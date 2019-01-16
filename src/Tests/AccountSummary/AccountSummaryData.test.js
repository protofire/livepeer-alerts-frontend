import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AccountSummaryData from '../../Components/AccountSummary/AccountSummaryData/AccountSummaryData'

configure({ adapter: new Adapter() })

const props = {
  summary: {
    bondedAmount: '',
    delegateAddress: '',
    delegatedAmount: '',
    fees: '',
    lastClaimRound: '',
    startRound: '',
    status: 'Bonded',
    withdrawRound: '',
    stake: '',
    delegateCalledReward: false
  }
}

describe('Renders account summary data', () => {
  it('Shows Fees', () => {
    const message = 'Earned from delegate fees'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[5] === message).toEqual(true)
  })
  it('Shows Status', () => {
    const message = 'Bonding Status'
    let wrapper = mount(<AccountSummaryData {...props} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[1] === message).toEqual(true)
  })

  it('Shows Bonded status msg if status is bonded and delegatedHasNotCalledReward', () => {
    const messageStatus = 'Bonded to delegate 1234 at round 1'
    const messageReward =
      'Unfortunately the delegate has not claimed the last inflationary token rewards.'
    const propsStatus = {
      summary: {
        delegateAddress: '1234',
        startRound: '1',
        status: 'Bonded',
        delegateCalledReward: false
      }
    }
    let wrapper = mount(<AccountSummaryData {...propsStatus} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[2].includes(messageStatus)).toEqual(true)
    expect(tr[2].includes(messageReward)).toEqual(true)
  })
  it('Shows Bonded status msg if status is bonded and delegatedHasCalledReward', () => {
    const messageStatus = 'Bonded to delegate 1234 at round 1'
    const messageReward =
      'The delegate has successfully claimed the last inflationary token rewards.'
    const propsStatus = {
      summary: {
        delegateAddress: '1234',
        startRound: '1',
        status: 'Bonded',
        delegateCalledReward: true
      }
    }
    let wrapper = mount(<AccountSummaryData {...propsStatus} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[2].includes(messageStatus)).toEqual(true)
    expect(tr[2].includes(messageReward)).toEqual(true)
  })
  it('Shows pending msg if status is pending', () => {
    const messageStatus = 'Pending'
    const messageExtra = "Your LPT is getting deluded by the protocol's token inflation."
    const msgAddValue = 'Add value to the network, bond to a delegate here'
    const propsStatus = {
      summary: {
        status: 'Pending'
      }
    }
    let wrapper = mount(<AccountSummaryData {...propsStatus} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[2].includes(messageStatus)).toEqual(true)
    expect(tr[2].includes(messageExtra)).toEqual(true)
    expect(tr[2].includes(msgAddValue)).toEqual(true)
  })
  it('Shows Unbonded msg if status is Unbonded', () => {
    const messageStatus = 'Unbonded'
    const messageExtra = "Your LPT is getting deluded by the protocol's token inflation."
    const msgAddValue = 'Add value to the network, bond to a delegate here'
    const propsStatus = {
      summary: {
        status: 'Unbonded'
      }
    }
    let wrapper = mount(<AccountSummaryData {...propsStatus} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[2].includes(messageStatus)).toEqual(true)
    expect(tr[2].includes(messageExtra)).toEqual(true)
    expect(tr[2].includes(msgAddValue)).toEqual(true)
  })
  it('Shows Unbonding msg if status is Unbonding', () => {
    const messageStatus = 'Unbonding'
    const messageExtra = 'You still have to wait a few moments to get finally unbonded.'
    const propsStatus = {
      summary: {
        status: 'Unbonding'
      }
    }
    let wrapper = mount(<AccountSummaryData {...propsStatus} />)
    let tr = wrapper.find('TableCell').map(tr => tr.text())
    expect(tr[2].includes(messageStatus)).toEqual(true)
    expect(tr[2].includes(messageExtra)).toEqual(true)
  })
})
