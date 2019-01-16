import React from 'react'
import Card from '../../../Common/UI/Card/Card.js'
import GridItem from '../../../Common/UI/Grid/GridItem.js'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from '../../../Common/UI/CustomButtons/Button'

const Reward = props => {
  const { classes, userData, summary } = props
  const { isSubscribed, address } = userData
  const { status, delegateCalledReward } = summary
  const disableOrHide = status !== 'Bonded'

  let subscriptionBtn
  if (isSubscribed) {
    subscriptionBtn = (
      <Button
        className={classes.subscriptionBtn}
        color="warning"
        disabled={disableOrHide}
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
        disabled={disableOrHide}
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

  // Add class to hide some blocks, buttons and description
  const classHidden = disableOrHide ? ` ${classes.gridItemHidden}` : ''

  return (
    <>
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
      <GridItem className={classes.buttonsContainer + classHidden} lg={12} md={12} xs={12}>
        <CopyToClipboard text={telegramLink}>
          <Button
            className={classes.subscriptionBtn}
            onClick={openTelegramLink}
            disabled={disableOrHide}
            color="info"
            round
            size="lg"
          >
            Telegram
          </Button>
        </CopyToClipboard>
        {subscriptionBtn}
      </GridItem>
      <GridItem className={classes.itemsContainerFull + classHidden} lg={12} md={12} xs={12}>
        <p className={classes.subscribeText}>Don't miss your LFT reward. Subscribe now!</p>
      </GridItem>
    </>
  )
}

export default Reward
