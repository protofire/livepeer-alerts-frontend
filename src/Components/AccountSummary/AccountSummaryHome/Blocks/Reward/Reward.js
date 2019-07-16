import React from 'react'
import RewardDescriptionDelegator from './RewardDescriptionDelegator'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import RewardDescriptionDelegate from './RewardDescriptionDelegate'

const Reward = props => {
  const { classes, userData, summary } = props
  const { isSubscribed, address } = userData
  const { status } = summary

  let statusCheck = status.toUpperCase()
  let disableOrHide = !['REGISTERED', 'BONDED', 'UNBONDING', 'UNBONDED'].includes(statusCheck)

  let subscriptionBtn
  if (isSubscribed) {
    subscriptionBtn = (
      <div
        className={classes.subscriptionBtn}
        color="warning"
        disabled={disableOrHide}
        onClick={props.onUnSubscribeBtnHandler}
        round
        size="lg"
      >
        <i className="fas fa-envelope" />
        Unsubscribe
      </div>
    )
  } else {
    subscriptionBtn = (
      <div
        className={classes.subscriptionBtn}
        color="primary"
        disabled={disableOrHide}
        onClick={props.onSubscribeBtnHandler}
        round
        size="lg"
      >
        <i className="fas fa-envelope" />
        Email
      </div>
    )
  }

  const telegramLink = `${process.env.REACT_APP_LIVEPEER_TELEGRAM_BOT_URL}?start=${address}`
  const openTelegramLink = () => {
    window.open(telegramLink, '_blank')
  }

  let rewardDescription = <RewardDescriptionDelegator {...props} />
  /** If the user is a delegate we show the delegate component, otherwise we show the delegator component **/
  if (props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder') {
    rewardDescription = <RewardDescriptionDelegate {...props} />
  }

  return (
    <>
      <div>{rewardDescription}</div>
      {disableOrHide ? null : (
        <>
          <div>
            <CopyToClipboard text={telegramLink}>
              {/* <Button
                className={classes.subscriptionBtn}
                onClick={openTelegramLink}
                disabled={disableOrHide}
                color="twitter"
                round
                size="lg"
              >
                <i className="fab fa-telegram-plane" />
                Telegram
              </Button> */}
            </CopyToClipboard>
            {subscriptionBtn}
          </div>
          <div>
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
          </div>
        </>
      )}
    </>
  )
}

export default Reward
