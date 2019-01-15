import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'
import AccountSummaryStyle from './AccountSummaryStyle'
import Button from '../../Common/UI/CustomButtons/Button'
import Card from '../../Common/UI/Card/Card.js'
import GridContainer from '../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../Common/UI/Grid/GridItem.js'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import tableStyle from '../../../assets/jss/dashboard/components/tableStyle'
import { withStyles } from '@material-ui/core/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { truncateStringInTheMiddle } from '../../../utils'

const AccountSummaryHome = props => {
  let disabledBtn = props.summary && props.summary.status !== 'Bonded'
  let subscriptionBtn
  let isSubscribed = props.userData && props.userData.isSubscribed ? 'Yes' : 'No'

  const { classes } = props
  const tableData = [
    {
      title: 'Address',
      data: props.userData.address
    },
    {
      title: 'ETH Balance',
      data: props.userData.ethBalance
    },
    {
      title: 'LivePeer Balance',
      data: props.lpBalance
    },
    {
      title: 'Subscribed',
      data: isSubscribed
    }
  ]

  if (props.userData && props.userData.isSubscribed) {
    subscriptionBtn = (
      <Button
        className={classes.subscriptionBtn}
        color="warning"
        disabled={disabledBtn}
        onClick={props.onUnSubscribeBtnHandler}
        round
        size="lg"
      >
        Unsubscribe
      </Button>
    )
  } else {
    subscriptionBtn = (
      <Button
        className={classes.subscriptionBtn}
        color="primary"
        disabled={disabledBtn}
        onClick={props.onSubscribeBtnHandler}
        round
        size="lg"
      >
        Subscribe via Email
      </Button>
    )
  }

  const address = props.userData && props.userData.address
  const telegramLink = `${process.env.LIVEPEER_TELEGRAM_BOT_URL}?start=${address}`
  const openTelegramLink = () => {
    window.open(telegramLink, '_blank')
  }

  const summaryTitle = `Welcome ${truncateStringInTheMiddle(address)}`

  return (
    <GridContainer className={classes.gridContainer} justify="center">
      <GridItem className={classes.cardContainer}>
        <Card className={classes.cardAccountSummary}>
          <h2 className={classes.cardTitle}>{summaryTitle}</h2>
          <GridContainer className={classes.gridContainer}>
            <GridItem lg={6} md={12} xs={12} className={classes.gridItem}>
              <Table className={` ${classes.table}`}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan="2"
                      className={`${classes.tableHeadCel} ${classes.noWrap} ${classes.pL0} ${
                        classes.pR0
                      } ${classes.tableTitle}`}
                    >
                      Overview
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
                          className={`${classes.tableCell} ${classes.textRight} ${
                            classes.wordBreak
                          }`}
                        >
                          {item.data}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </GridItem>
            <GridItem lg={6} md={12} xs={12} className={classes.gridItem}>
              <AccountSummaryData summary={props.summary} />
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.buttonContainer} justify="flex-end">
            <GridItem
              className={`${classes.buttonContainerItem} ${classes.gridItem}`}
              container={true}
              justify="space-between"
              lg={6}
              md={12}
              xs={12}
            >
              <CopyToClipboard text={telegramLink}>
                <Button
                  className={classes.subscriptionBtn}
                  onClick={openTelegramLink}
                  disabled={disabledBtn}
                  color="info"
                  round
                  size="lg"
                >
                  Subscribe via Telegram
                </Button>
              </CopyToClipboard>
              {subscriptionBtn}
            </GridItem>
          </GridContainer>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
export default withStyles(theme => ({
  ...AccountSummaryStyle,
  ...tableStyle(theme)
}))(AccountSummaryHome)
