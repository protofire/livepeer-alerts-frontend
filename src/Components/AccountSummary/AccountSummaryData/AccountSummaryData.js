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
      data: props.summary.status + ', ' + statusMsg
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
  switch (props.summary && props.summary.status) {
    case 'Pending': {
      msg =
        "  your LPT is getting deluded by the protocol's token inflation. Add value to the network,\n" +
        '          bond to a transcoder here.'
      break
    }
    case 'Bonded': {
      msg =
        'bonded to transcoder ' +
        props.summary.delegateAddress +
        'at round {props.summary.startRound}'
      break
    }
    case 'Unbonding': {
      msg = 'your still have to wait a few moments to get finally unbonded.'
      break
    }
    case 'Unbonded': {
      msg =
        "your LPT is getting deluded by the protocol's token inflation. Add value to the network,\n" +
        '          bond to a transcoder here.'
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
