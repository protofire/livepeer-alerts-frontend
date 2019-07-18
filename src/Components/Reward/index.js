import React from 'react'
import RewardDescriptionDelegator from './RewardDescriptionDelegator'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import RewardDescriptionDelegate from './RewardDescriptionDelegate'
import Card from '../Common/Card'
import styled from 'styled-components'

const AccountSummaryHomeContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 574px;
`

const Reward = props => {
  const { userData, summary } = props
  const { isSubscribed, address } = userData
  const { status } = summary

  let statusCheck = status.toUpperCase()
  let disableOrHide = !['REGISTERED', 'BONDED', 'UNBONDING', 'UNBONDED'].includes(statusCheck)

  let subscriptionBtn
  if (isSubscribed) {
    subscriptionBtn = (
      <div color="warning" disabled={disableOrHide} onClick={props.onUnSubscribeBtnHandler} round size="lg">
        Unsubscribe
      </div>
    )
  } else {
    subscriptionBtn = (
      <div color="primary" disabled={disableOrHide} onClick={props.onSubscribeBtnHandler}>
        Email
      </div>
    )
  }

  const telegramLink = `${process.env.REACT_APP_LIVEPEER_TELEGRAM_BOT_URL}?start=${address}`
  const openTelegramLink = () => {
    window.open(telegramLink, '_blank')
  }
  const isDelegate = props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder'

  return (
    <Card>{isDelegate ? <RewardDescriptionDelegate {...props} /> : <RewardDescriptionDelegator {...props} />}</Card>
    // {disableOrHide ? null : (
    //   <>
    //     <div>
    //       <CopyToClipboard text={telegramLink}>
    //         <button onClick={openTelegramLink} disabled={disableOrHide}>
    //           Telegram
    //         </button>
    //       </CopyToClipboard>
    //       {subscriptionBtn}
    //     </div>
    //     <div>
    //       <p>
    //         Don't miss your
    //         <a
    //           href="https://forum.livepeer.org/t/why-you-should-bond-your-new-livepeer-tokens-lpt-detailed-version/418"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           {' '}
    //           LPT reward.{' '}
    //         </a>
    //         Subscribe now!
    //       </p>
    //     </div>
    //   </>
    // )}
  )
}

export default Reward
