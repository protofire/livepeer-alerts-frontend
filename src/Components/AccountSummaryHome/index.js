import React from 'react'
import RewardSubscribeText from '../RewardSubscribeText'
import StatusDelegate from '../StatusDelegate'
import StatusDelegator from '../StatusDelegator'
import Wallet from '../Wallet'
import TranscoderInfo from '../TranscoderInfo'
import EarnedRewards from '../EarnedRewards'
import styled, { css } from 'styled-components'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import Reward from '../Reward'
import Button from '../Common/Button'
import IconEmail from '../Common/MainMenu/icons/IconEmail'
import IconTelegram from '../Common/MainMenu/icons/IconTelegram'

const AccountSummaryHomeContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 574px;
`

const MultiBlocksRow = styled.div`
  display: grid;
  grid-row-gap: ${props => props.theme.margins.blockSeparation};
  grid-template-columns: 1fr;
  margin-bottom: ${props => props.theme.margins.blockSeparation};

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    grid-column-gap: ${props => props.theme.margins.blockSeparation};
    grid-template-columns: 1fr 1fr;
  }
`
const MultiBlocksRowTop = styled(MultiBlocksRow)`
  margin-bottom: 40px;
`

const SingleBlockRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: ${props => props.theme.margins.blockSeparation};
`

const RoundedBtn = styled(Button)`
  height: 44px;
`

const aCSS = css`
  color: #fff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

const A = styled.span`
  ${aCSS}
`

const RewardSubscribeTextStyled = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  padding: 25px 0 0 0;
  text-align: center;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.9);

  a {
    ${aCSS}
  }
`

const getSubscriptionBtns = props => {
  const { subscriberData, onSubscribeBtnHandler, onTelegramBtnHandler, summary } = props
  const { isSubscribed } = subscriberData
  const { status } = summary
  const statusCheck = status.toUpperCase()
  const hideButtons = !['REGISTERED', 'BONDED', 'UNBONDING', 'PENDING', 'UNBONDED'].includes(statusCheck)

  return hideButtons ? null : (
    <>
      <RoundedBtn type="tertiary" onClick={onTelegramBtnHandler}>
        <IconTelegram />
        Telegram
      </RoundedBtn>
      <RoundedBtn type="primary" onClick={onSubscribeBtnHandler}>
        <IconEmail />
        {isSubscribed ? 'Subscription' : 'Subscribe'}
      </RoundedBtn>
    </>
  )
}

const getSubscriberFooterTexts = props => {
  const { subscriberData, onUnSubscribeBtnHandler, summary } = props
  const { isSubscribed } = subscriberData
  const { status } = summary
  const statusCheck = status.toUpperCase()
  const showBtns = !['REGISTERED', 'BONDED', 'UNBONDING', 'UNBONDED'].includes(statusCheck)

  return showBtns ? null : (
    <RewardSubscribeTextStyled>
      {isSubscribed ? <A onClick={showBtns ? null : onUnSubscribeBtnHandler}>Unsubscribe</A> : null}
    </RewardSubscribeTextStyled>
  )
}

const AccountSummaryHome = props => {
  const { summary, subscriberData, earnedRewardData, myDelegateData, summaryData } = props
  const isDelegate = summary && summary.role && summary.role.toLowerCase() === 'transcoder'
  const wallet = summary.loadingSummary ? (
    <SmallLoadingCard show={true} message={'Loading user wallet...'} />
  ) : (
    <Wallet {...props} />
  )
  const subscriberStatus = isDelegate ? <StatusDelegate {...props} /> : <StatusDelegator {...props} />
  const subscriberStatusCard = summary.loadingSummary ? (
    <SmallLoadingCard show={true} message={'Loading user wallet...'} />
  ) : (
    subscriberStatus
  )
  const subscriberBtns = getSubscriptionBtns(props)
  const subscriberFooterTexts = getSubscriberFooterTexts(props)

  return (
    <AccountSummaryHomeContainer>
      <MultiBlocksRowTop>
        {wallet}
        {subscriberStatusCard}
      </MultiBlocksRowTop>
      {!isDelegate && summary.status === 'Bonded' && (
        <>
          <MultiBlocksRow>
            <TranscoderInfo myDelegateData={myDelegateData} subscriberData={subscriberData} summaryData={summaryData} />
            <EarnedRewards earnedRewardData={earnedRewardData} />
          </MultiBlocksRow>
        </>
      )}
      <SingleBlockRow>
        <Reward {...props} />
      </SingleBlockRow>
      <SingleBlockRow>
        <RewardSubscribeText {...props} />
      </SingleBlockRow>
      <MultiBlocksRow>{subscriberBtns}</MultiBlocksRow>
      <SingleBlockRow>{subscriberFooterTexts}</SingleBlockRow>
    </AccountSummaryHomeContainer>
  )
}

export default AccountSummaryHome
