import React from 'react'
import './AccountSummaryData.css'
const AccountSummaryData = props => {
  let statusMsg = getStatusMsg(props.summary.status)
  return (
    <>
      <table className="accountSummaryDataTable">
        <thead>
          <tr>
            <th colSpan="2">Summary Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BondedAmount</td>
            <td>{props.summary.bondedAmount} </td>
          </tr>
          <tr>
            <td>Earned from delegated fees:</td>
            <td>{props.summary.fees} ETH</td>
          </tr>
          <tr>
            <td>LastClaimRound</td>
            <td>{props.summary.lastClaimRound}</td>
          </tr>
          <tr>
            <td>StartRound</td>
            <td>{props.summary.startRound}</td>
          </tr>
          <tr>
            <td>WithdrawRound</td>
            <td>{props.summary.withdrawRound}</td>
          </tr>
          <tr>
            <td>Stake</td>
            <td>{props.summary.stake} LPT</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{props.summary.status}</td>
          </tr>
          <tr>{statusMsg}</tr>
        </tbody>
      </table>
    </>
  )
}

const getStatusMsg = status => {
  let msg
  /** TODO -- Delete once backed implemented **/
  let transcoder = {
    address: '',
    round: '',
    at: ''
  }
  switch (status) {
    case 'Pending': {
      msg = (
        <td>
          your LPT is getting deluded by the protocol's token inflation. Add value to the network,
          bond to a transcoder here.
        </td>
      )
      break
    }
    case 'Bonded': {
      msg = (
        <td>
          bonded to transcoder {transcoder.address} at round {transcoder.round} on {transcoder.at}
        </td>
      )
      break
    }
    case 'Unbonding': {
      msg = <td>your still have to wait a few moments to get finally unbonded.</td>
      break
    }
    case 'Unbonded': {
      msg = (
        <td>
          your LPT is getting deluded by the protocol's token inflation. Add value to the network,
          bond to a transcoder here.
        </td>
      )
      break
    }
    default:
      msg = null
  }
  return msg
}

export default AccountSummaryData
