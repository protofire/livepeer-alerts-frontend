import React from 'react'
import './AccountSummaryData.css'
const AccountSummaryData = props => {
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
            <td>Fees</td>
            <td>{props.summary.fees}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{props.summary.status}</td>
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
            <td>{props.summary.totalStake}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
export default AccountSummaryData
