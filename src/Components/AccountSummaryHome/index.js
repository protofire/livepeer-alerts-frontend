import React from 'react'
import RewardSubscribeText from '../RewardSubscribeText'
import StatusDelegate from '../StatusDelegate'
import StatusDelegator from '../StatusDelegator'
import Wallet from '../Wallet'
import TranscoderInfo from '../TranscoderInfo'
import EarnedRewards from '../EarnedRewards'
import styled from 'styled-components'
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

const MultiBlocksRowBottom = styled(MultiBlocksRow)`
  margin-top: 40px;
  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    grid-column-gap: ${props => props.theme.margins.btnBlocksSeparation};
  }
`

const RoundedBtn = styled(Button)`
  border-radius: 30px;
  height: 50px;
  > svg {
    margin-right: 4px;
  }
`

const TelegramBtn = styled(RoundedBtn)`
  background-color: #55acee;
`

const EmailBtn = styled(RoundedBtn)`
  background-color: #ff9800;
`

const getSubscriptionBtns = props => {
  const { subscriberData, onUnSubscribeBtnHandler, onSubscribeBtnHandler, onTelegramBtnHandler, summary } = props
  const { isSubscribed } = subscriberData
  const { status } = summary
  const statusCheck = status.toUpperCase()
  const showBtns = !['REGISTERED', 'BONDED', 'UNBONDING', 'UNBONDED'].includes(statusCheck)
  const content = isSubscribed ? (
    <EmailBtn onClick={onUnSubscribeBtnHandler}>
      <IconEmail />
      Unsubscribe
    </EmailBtn>
  ) : (
    <EmailBtn onClick={onSubscribeBtnHandler}>
      <IconEmail />
      Email
    </EmailBtn>
  )
  return showBtns ? null : (
    <>
      <TelegramBtn onClick={onTelegramBtnHandler}>
        <IconTelegram />
        Telegram
      </TelegramBtn>
      {content}
    </>
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
      <Reward {...props} />
      <MultiBlocksRowBottom>{subscriberBtns}</MultiBlocksRowBottom>
      <RewardSubscribeText {...props} />
    </AccountSummaryHomeContainer>
  )
}
export default AccountSummaryHome
