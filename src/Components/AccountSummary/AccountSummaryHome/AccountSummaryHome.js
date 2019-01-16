import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'
import AccountSummaryStyle from './AccountSummaryStyle'
import Button from '../../Common/UI/CustomButtons/Button'
import Card from '../../Common/UI/Card/Card.js'
import GridContainer from '../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../Common/UI/Grid/GridItem.js'
import React from 'react'
import metamaskImage from '../../../assets/img/logos/metamask.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { truncateStringInTheMiddle } from '../../../utils'
import { withStyles } from '@material-ui/core/styles'

const AccountSummaryHome = props => {
  let disabledBtn = props.summary && props.summary.status !== 'Bonded'
  let subscriptionBtn

  const { classes } = props
  const tableData = [
    {
      currency: 'LPT',
      data: props.lpBalance
    },
    {
      currency: 'ETH',
      data: props.userData.ethBalance
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
        Email
      </Button>
    )
  }

  const address = props.userData && props.userData.address
  const telegramLink = `${process.env.REACT_APP_LIVEPEER_TELEGRAM_BOT_URL}?start=${address}`
  const openTelegramLink = () => {
    window.open(telegramLink, '_blank')
  }

  return (
    <GridContainer className={classes.gridContainer} justify="center">
      <GridItem className={classes.itemsContainer} lg={12} md={12} xs={12}>
        <Card className={classes.cardItem}>
          <div className={classes.logoMetamask}>
            <img src={metamaskImage} className={classes.logoMetamaskImg} alt="" />
          </div>
          <h3 title={address} className={classes.walletTitle}>
            {truncateStringInTheMiddle(address)}
          </h3>
          <div className={`${classes.blockData}`}>
            {tableData.map((item, index) => {
              return (
                <div className={`${classes.blockDataItem}`} key={index}>
                  <p className={`${classes.blockDataItemValue}`}>{item.data}</p>
                  <h4 className={`${classes.blockDataItemTitle}`}>{item.currency}</h4>
                </div>
              )
            })}
          </div>
        </Card>
        <Card className={classes.cardItem}>
          <AccountSummaryData summary={props.summary} />
        </Card>
      </GridItem>
      {/* Reward calls */}
      <GridItem className={classes.itemsContainerFull} lg={12} md={12} xs={12}>
        <Card className={classes.cardItem}>
          <h3 className={classes.rewardTitle}>Reward Calls</h3>
          <p className={classes.rewardText}>Reward Calls text, put something here...</p>
        </Card>
      </GridItem>
      {/* Buttons */}
      <GridItem className={classes.buttonsContainer} lg={12} md={12} xs={12} justify="center">
        <CopyToClipboard text={telegramLink}>
          <Button
            className={classes.subscriptionBtn}
            onClick={openTelegramLink}
            disabled={disabledBtn}
            color="info"
            round
            size="lg"
          >
            Telegram
          </Button>
        </CopyToClipboard>
        {subscriptionBtn}
      </GridItem>
      {/* Subscribe */}
      <GridItem className={classes.itemsContainerFull} lg={12} md={12} xs={12}>
        <p className={classes.subscribeText}>Don't miss your LFT reward. Subscribe now!</p>
      </GridItem>
    </GridContainer>
  )
}
export default withStyles(theme => ({
  ...AccountSummaryStyle
}))(AccountSummaryHome)
