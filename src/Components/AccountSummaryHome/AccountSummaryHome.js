import React from 'react'
import Reward from './Blocks/Reward/Reward'
import StatusDelegate from './Blocks/Status/StatusDelegate'
import StatusDelegator from './Blocks/Status/StatusDelegator'
import Wallet from './Blocks/Wallet'

const AccountSummaryHome = props => {
  let statusBlock = <StatusDelegator {...props} />
  /** If the user is a delegate we show the delegate component, otherwise we show the delegator component **/
  if (props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder') {
    statusBlock = <StatusDelegate {...props} />
  }

  return (
    <div>
      <div>
        <Wallet {...props} />
        {statusBlock}
      </div>
      <Reward {...props} />
    </div>
  )
}
export default AccountSummaryHome
