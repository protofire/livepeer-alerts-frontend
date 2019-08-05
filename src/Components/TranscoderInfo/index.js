import React from 'react'
import Card from '../Common/Card'
import IconActive from './img/IconActive'
import IconInactive from './img/IconInactive'
import StrippedList, { TR, TD } from '../Common/StrippedList'
import styled from 'styled-components'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import { truncateStringInTheMiddle, decimalPlaces } from '../../Utils'

const Status = styled.h3`
  align-items: center;
  color: ${props => props.theme.colors.lightText};
  display: flex;
  font-size: 10px;
  font-weight: 500;
  justify-content: center;
  line-height: 1.3;
  margin: 0 0 15px;
  text-align: center;
  text-transform: uppercase;

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
  color: black;
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

  const isActive = true
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
        title: 'Missed Reward Calls',
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

  const title = (
    <A href={delegateAddressUrl} target="_blank" rel="noopener noreferrer">
      {truncateStringInTheMiddle(delegateData.address)}
    </A>
  )

  const card = (
    <Card title={title} tooltip={delegateData.address} titleAlign="center" {...restProps}>
      <Status>
        {isActive ? (
          <>
            <IconActive /> Active
          </>
        ) : (
          <>
            <IconInactive /> Inactive
          </>
        )}
      </Status>
      <StrippedListStyled>
        {delegateData.data.map((item, index) => {
          return (
            <TR key={index}>
              <TDTitle>{item.title}</TDTitle>
              <TDData>{item.data}</TDData>
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
