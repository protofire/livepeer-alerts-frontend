import React from 'react'
import Reward from './Blocks/Reward/Reward'
import StatusDelegator from './Blocks/Status/StatusDelegator'
import Wallet from './Blocks/Wallet'
import StatusDelegate from './Blocks/Status/StatusDelegate'

const AccountSummaryHome = props => {
  const { classes } = props

  let statusBlock = <StatusDelegator {...props} />
  /** If the user is a delegate we show the delegate component, otherwise we show the delegator component **/
  if (props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder') {
    statusBlock = <StatusDelegate {...props} />
  }

  return (
    <div>
      <div>
        {/* Wallet block */}
        <Wallet {...props} />
        {/* Status block */}
        {statusBlock}
      </div>
      {/* Reward calls */}
      <Reward {...props} />
    </div>
  )
}
export default AccountSummaryHome
