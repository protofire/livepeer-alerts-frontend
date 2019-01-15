import AccountSummaryStyle from '../AccountSummaryHome/AccountSummaryStyle'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const AccountSummaryData = props => {
  const tableData = [
    {
      title: 'Stake',
      currency: 'LPT',
      data: props.summary.stake
    },
    {
      title: 'Earning fees',
      currency: 'ETH',
      data: props.summary.fees
    }
  ]
  const { classes } = props

  return (
    <>
      <div className={classes.topInfo}>
        <h3 className={`${classes.walletTitle} ${classes.lessMarginBottom}`}>Bonding Status</h3>
        {getStatusMsg(props)}
      </div>
      <div className={`${classes.blockData}`}>
        {tableData.map((item, index) => {
          return (
            <div className={`${classes.blockDataItem}`} key={index}>
              <h3 className={`${classes.blockDataItemMainTitle}`}>{item.title}</h3>
              <p className={`${classes.blockDataItemValue}`}>{item.data}</p>
              <h4 className={`${classes.blockDataItemTitle}`}>{item.currency}</h4>
            </div>
          )
        })}
      </div>
    </>
  )
}

const getStatusMsg = props => {
  let msg
  const { classes } = props
  switch (props.summary && props.summary.status) {
    case 'Pending': {
      msg = (
        <>
          <p className={classes.walletInfo}>{props.summary.status}</p>
          <p className={classes.walletInfo}>
            Your LPT is getting deluded by the protocol's token inflation.
          </p>
          <p className={classes.walletInfo}>
            Add value to the network, bond to a transcoder
            <a href="https://explorer.livepeer.org/transcoders"> here</a>
          </p>
        </>
      )
      break
    }
    case 'Bonded': {
      let tokenRewardsText
      const delegateAddress = props.summary.delegateAddress
      const delegateAddressUrl = 'https://explorer.livepeer.org/accounts/' + delegateAddress

      if (!props.summary.delegateCalledReward) {
        tokenRewardsText = (
          <p className={classes.walletInfo}>
            Unfortunately the transcoder has not claimed the last inflationary token rewards.
          </p>
        )
      } else {
        tokenRewardsText = (
          <p className={classes.walletInfo}>
            The transcoder has successfully claimed the last inflationary token rewards.
          </p>
        )
      }
      msg = (
        <>
          <p className={classes.walletInfo}>{props.summary.status} </p>
          <p className={classes.walletInfo}>
            Bonded to transcoder <a href={delegateAddressUrl}>{delegateAddress}</a> at round{' '}
            {props.summary.startRound}{' '}
          </p>
          {tokenRewardsText}
        </>
      )
      break
    }
    case 'Unbonding': {
      msg = (
        <>
          <p className={classes.walletInfo}>{props.summary.status}</p>
          <p className={classes.walletInfo}>
            You still have to wait a few moments to get finally unbonded.
          </p>
        </>
      )
      break
    }
    case 'Unbonded': {
      msg = (
        <>
          <p className={classes.walletInfo}>{props.summary.status}</p>
          <p className={classes.walletInfo}>
            Your LPT is getting deluded by the protocol's token inflation.
          </p>
          <p className={classes.walletInfo}>
            Add value to the network, bond to a transcoder
            <a href="https://explorer.livepeer.org/transcoders"> here</a>
          </p>
        </>
      )
      break
    }
    default:
      msg = null
  }
  return msg
}

export default withStyles(theme => ({
  ...AccountSummaryStyle
}))(AccountSummaryData)
