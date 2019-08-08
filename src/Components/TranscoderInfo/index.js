import React from 'react'
import Card from '../Common/Card'
import IconActive from './img/IconActive'
import IconInactive from './img/IconInactive'
import StrippedList, { TR, TD } from '../Common/StrippedList'
import styled from 'styled-components'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import { truncateStringInTheMiddle, decimalPlaces } from '../../Utils'
import Tooltip from '../Common/Tooltip'

const Status = styled.h3`
  align-items: center;
  color: ${props => props.theme.colors.lightText};
  display: flex;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 15px;
  text-align: center;

  > svg {
    margin: 0 5px 0 0;
  }
`

const StrippedListStyled = styled(StrippedList)`
  margin-top: auto;
`

const TDTitle = styled(TD)`
  font-weight: 500;
`

const TDData = styled(TD)`
  text-align: right;
`
const A = styled.a`
  color: ${props => props.theme.colors.lightText};
  font-size: 13px;
  font-weight: 500;
`

const SpanPipe = styled.span`
  padding-right: 5px;
  padding-left: 5px;
`

const TitleWithHelp = styled.div`
  display: flex;
`

const TranscoderInfo = props => {
  const { myDelegateData, summaryData, ...restProps } = props

  const totalStake = (myDelegateData && myDelegateData.totalStake) || 0
  const delegatorStake = (summaryData && summaryData.delegator && summaryData.delegator.totalStakeInLPT) || 0
  const participationInStake = totalStake > 0 ? (delegatorStake * 100) / totalStake : 0

  const address = summaryData && summaryData.delegator && summaryData.delegator.delegateAddress
  const missedRewardCalls = (myDelegateData && myDelegateData.last30RoundsMissedRewardCalls) || 0
  const rewardCut = (myDelegateData && myDelegateData.rewardCut) || 0
  const rewardCutPercentage = rewardCut / 10000

  const roi = (myDelegateData && myDelegateData.roiAbs) || 0
  const roiEvery1000 = (myDelegateData && myDelegateData.roiPercent) || 0

  const isActive = (summaryData && summaryData.delegator && summaryData.delegator.delegateIsActive) || true

  const haveDelegateCalledReward =
    (summaryData && summaryData.delegator && summaryData.delegator.delegateCalledReward) || true
  let bondedDescription

  if (haveDelegateCalledReward) {
    bondedDescription = 'The delegate has successfully claimed the last inflationary token rewards.'
  } else {
    bondedDescription = 'Unfortunately the delegate has not claimed the last inflationary token rewards.'
  }

  const delegateData = {
    address: address,
    data: [
      {
        title: 'Your Participation In Stake',
        data: `${decimalPlaces(participationInStake)}%`,
      },
      {
        title: 'Reward Cut',
        data: `${decimalPlaces(rewardCutPercentage)}%`,
      },
      {
        title: (
          <TitleWithHelp>
            Missed Reward Calls
            <Tooltip description={bondedDescription} />
          </TitleWithHelp>
        ),
        data: `${missedRewardCalls}/30`,
      },
      {
        title: 'ROI / round for 1000 LPT',
        data: `${decimalPlaces(roi)}`,
      },
      {
        title: 'ROI (%)',
        data: `${decimalPlaces(roiEvery1000)}%`,
      },
    ],
  }

  const delegateAddressUrl = `https://explorer.livepeer.org/accounts/${delegateData.address}/transcoding`

  const delegateAddress = (
    <A href={delegateAddressUrl} title={delegateData.address} target="_blank" rel="noopener noreferrer">
      {truncateStringInTheMiddle(delegateData.address)}
    </A>
  )

  const pipe = <SpanPipe>|</SpanPipe>

  const card = (
    <Card title="Your delegate" {...restProps}>
      <div>
        <Status>
          {isActive ? (
            <>
              <IconActive /> Active
              {pipe}
              {delegateAddress}
            </>
          ) : (
            <>
              <IconInactive /> Inactive
              {pipe}
              {delegateAddress}
            </>
          )}
        </Status>
      </div>
      <StrippedListStyled>
        {delegateData.data.map((item, index) => {
          return (
            <TR key={index}>
              <TDTitle>{item.title}</TDTitle>
              <TDData>{item.data} </TDData>
            </TR>
          )
        })}
      </StrippedListStyled>
    </Card>
  )

  const myDelegateDataCard =
    myDelegateData && myDelegateData.loadingMyDelegateData ? (
      <SmallLoadingCard show={true} message={'Loading my delegate data...'} />
    ) : (
      card
    )

  return myDelegateDataCard
}

export default TranscoderInfo
