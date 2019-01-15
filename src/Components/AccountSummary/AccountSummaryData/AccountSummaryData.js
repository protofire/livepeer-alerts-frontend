import AccountSummaryStyle from '../AccountSummaryHome/AccountSummaryStyle'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import tableStyle from '../../../assets/jss/dashboard/components/tableStyle'
import { withStyles } from '@material-ui/core/styles'

const AccountSummaryData = props => {
  let statusMsg = getStatusMsg(props)
  const tableData = [
    { title: 'BondedAmount', data: props.summary.bondedAmount },
    {
      title: 'Earned from delegate fees',
      data: props.summary.fees
    },
    {
      title: 'Status',
      data: statusMsg
    },
    {
      title: 'Stake',
      data: props.summary.stake + ' LPT'
    }
  ]
  const { classes } = props

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell
            colSpan="2"
            className={`${classes.tableHeadCel} ${classes.noWrap} ${classes.pL0} ${classes.pR0} ${
              classes.tableTitle
            }`}
          >
            Summary Information
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell className={`${classes.tableCell} ${classes.noWrap}`}>
                {item.title}
              </TableCell>
              <TableCell
                className={`${classes.tableCell} ${classes.textRight} ${classes.wordBreak}`}
              >
                {item.data}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const getStatusMsg = props => {
  let msg
  const { classes } = props
  switch (props.summary && props.summary.status) {
    case 'Pending': {
      msg = (
        <>
          <p className={classes.textLeft}>{props.summary.status}</p>
          <p className={classes.textLeft}>
            your LPT is getting deluded by the protocol's token inflation.
          </p>
          <p className={classes.textLeft}>
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
          <p className={classes.textLeft}>
            Unfortunately the transcoder has not claimed the last inflationary token rewards.
          </p>
        )
      } else {
        tokenRewardsText = (
          <p className={classes.textLeft}>
            The transcoder has successfully claimed the last inflationary token rewards.
          </p>
        )
      }
      msg = (
        <>
          <p className={classes.textLeft}>{props.summary.status} </p>
          <p className={classes.textLeft}>
            bonded to transcoder <a href={delegateAddressUrl}>{delegateAddress}</a> at round{' '}
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
          <p className={classes.textLeft}>{props.summary.status}</p>
          <p className={classes.textLeft}>
            your still have to wait a few moments to get finally unbonded.
          </p>
        </>
      )
      break
    }
    case 'Unbonded': {
      msg = (
        <>
          <p className={classes.textLeft}>{props.summary.status}</p>
          <p className={classes.textLeft}>
            your LPT is getting deluded by the protocol's token inflation.
          </p>
          <p className={classes.textLeft}>
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
  ...AccountSummaryStyle,
  ...tableStyle(theme)
}))(AccountSummaryData)
