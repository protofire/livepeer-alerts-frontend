import React from 'react'
import Card from '../../../Common/UI/Card/Card.js'
import GridItem from '../../../Common/UI/Grid/GridItem.js'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from '../../../Common/UI/CustomButtons/Button'
import Parser from 'html-react-parser'
import { truncateStringInTheMiddle } from '../../../../utils'

const Reward = props => {
  const { classes, userData, summary } = props
  const { isSubscribed, address } = userData
  const { status, delegateCalledReward, delegateAddress, startRound } = summary
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

  const messageForBonded = data => {
    const { status, startRound, delegateAddress } = data

    if (status !== 'Bonded') {
      return
    }

    const delegateAddressUrl = `https://explorer.livepeer.org/accounts/${delegateAddress}/transcoding`

    return `<br>(You are bonded to delegate <a href=${delegateAddressUrl} target="_blank" rel="noopener noreferrer">${truncateStringInTheMiddle(
      delegateAddress
    )}</a> since round ${startRound}.`
  }

  const getRewardMessage = data => {
    const { status, type, delegateCalledReward } = data
    let bondedDescription

    if (delegateCalledReward) {
      bondedDescription = `The delegate has successfully claimed the last inflationary token rewards. ${messageForBonded(
        data
      )}<br><br>`
    } else {
      bondedDescription = `${messageForBonded(data)}<br><br>
Unfortunately the delegate has not claimed the last inflationary token rewards.`
    }

    const messages = {
      Bonded: {
        title: `Delegate reward calling status`,
        description: bondedDescription
      },
      Pending: {
        title: `You are currently in the Pending state`,
        description: `A delegator enters the Pending state when it bonds from the Unbonded state.`
      },
      Unbonding: {
        title: `You are currently in the Unbonding state`,
        description: `You still have to wait a few moments to get finally Unbonded.`
      },
      Unbonded: {
        title: `Your current status is: Unbonded`,
        description: `As a delegator you are in the Unbounded state if you are not bonded to any delegate yet or if you have unbonded your tokens completely.`
      }
    }

    return Parser(messages[status][type])
  }

  return (
    <>
      <GridItem className={classes.itemsContainerFull} lg={12} md={12} xs={12}>
        <Card className={classes.cardItem}>
          <h3 className={classes.rewardTitle}>
            {getRewardMessage({ status, type: 'title', delegateCalledReward })}
          </h3>
          <p className={classes.rewardText}>
            {getRewardMessage({
              status,
              type: 'description',
              delegateCalledReward,
              startRound,
              delegateAddress
            })}
          </p>
        </Card>
      </GridItem>
      {disableOrHide ? null : (
        <>
          <GridItem className={classes.buttonsContainer} lg={12} md={12} xs={12}>
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
          <GridItem className={classes.itemsContainerFull} lg={12} md={12} xs={12}>
            <p className={classes.subscribeText}>
              Don't miss your
              <a
                href="https://forum.livepeer.org/t/why-you-should-bond-your-new-livepeer-tokens-lpt-detailed-version/418"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                LPT reward.{' '}
              </a>
              Subscribe now!
            </p>
          </GridItem>
        </>
      )}
    </>
  )
}

export default Reward
