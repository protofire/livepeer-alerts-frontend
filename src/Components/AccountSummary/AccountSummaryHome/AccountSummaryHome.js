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
  const { isSubscribed, address, ethBalance } = props.userData
  const { status, delegateCalledReward } = props.summary
  const disabledBtn = status !== 'Bonded'

  const { classes } = props
  const tableData = [
    {
      currency: 'LPT',
      data: props.lpBalance
    },
    {
      currency: 'ETH',
      data: ethBalance
    }
  ]

  let subscriptionBtn
  if (isSubscribed) {
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

  const telegramLink = `${process.env.REACT_APP_LIVEPEER_TELEGRAM_BOT_URL}?start=${address}`
  const openTelegramLink = () => {
    window.open(telegramLink, '_blank')
  }

  const getRewardMessage = data => {
    const { status, type, delegateCalledReward } = data
    let bondedDescription

    if (delegateCalledReward) {
      bondedDescription = `The delegate has successfully claimed the last inflationary token rewards.`
    } else {
      bondedDescription = `Unfortunately the delegate has not claimed the last inflationary token rewards.`
    }

    const messages = {
      Bonded: {
        title: `Reward Calls`,
        description: bondedDescription
      },
      Pending: {
        title: `Delegation is pending`,
        description: `Your LPT is getting deluded by the protocol's token inflation. Add value to the network, bond to a transcoder <a
              href="https://explorer.livepeer.org/transcoders"
              target="_blank"
              rel="noopener noreferrer"
            >`
      },
      Unbonding: {
        title: `You are currently unbonding from your delegate`,
        description: `You still have to wait a few moments to get finally unbonded.`
      },
      Unbonded: {
        title: `You've been unbonded from your delegate`,
        description: `Add value to the network, bond to a delegate
            <a
              href="https://explorer.livepeer.org/transcoders"
              target="_blank"
              rel="noopener noreferrer"
            > here </a>`
      }
    }

    return messages[status][type]
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
          <h3 className={classes.rewardTitle}>
            {getRewardMessage({ status, type: 'title', delegateCalledReward })}
          </h3>
          <p className={classes.rewardText}>
            {getRewardMessage({ status, type: 'description', delegateCalledReward })}
          </p>
        </Card>
      </GridItem>
      {/* Buttons */}
      <GridItem className={classes.buttonsContainer} lg={12} md={12} xs={12}>
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
