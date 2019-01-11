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
  const tableData = [
    { title: 'BondedAmount', data: props.summary.bondedAmount },
    {
      title: 'Fees',
      data: props.summary.fees
    },
    {
      title: 'Status',
      data: props.summary.status
    },
    {
      title: 'LastClaimRound',
      data: props.summary.lastClaimRound
    },
    {
      title: 'StartRound',
      data: props.summary.startRound
    },
    {
      title: 'WithdrawRound',
      data: props.summary.withdrawRound
    },
    {
      title: 'Stake',
      data: props.summary.totalStake
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

export default withStyles(theme => ({
  ...AccountSummaryStyle,
  ...tableStyle(theme)
}))(AccountSummaryData)
