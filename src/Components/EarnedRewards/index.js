import React from 'react'
import Card from '../Common/Card'
import StrippedList, { TR, TD, TH } from '../Common/StrippedList'
import Tooltip from '../Common/Tooltip'
import styled from 'styled-components'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import { toFixedDecimals } from '../../Utils'

const Description = styled.h3`
  display: flex;
  color: ${props => props.theme.colors.lightText};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 15px;
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

const THData = styled(TH)`
  text-align: right;
`

const EarnedRewards = props => {
  const { earnedRewardData, ...restProps } = props

  // Next rewards
  const earnedRewardNextLpt =
    earnedRewardData && earnedRewardData.nextReward && earnedRewardData.nextReward.delegateReward
  const earnedRewardNextCut =
    earnedRewardData && earnedRewardData.nextReward && earnedRewardData.nextReward.delegatorReward

  // Last rewards
  const earnedRewardLastLpt =
    earnedRewardData && earnedRewardData.lastRoundReward && earnedRewardData.lastRoundReward.delegateReward
  const earnedRewardLastCut =
    earnedRewardData && earnedRewardData.lastRoundReward && earnedRewardData.lastRoundReward.delegatorReward

  // 7 rewards
  const earnedReward7Lpt =
    earnedRewardData && earnedRewardData.last7RoundsReward && earnedRewardData.last7RoundsReward.delegateReward
  const earnedReward7Cut =
    earnedRewardData && earnedRewardData.last7RoundsReward && earnedRewardData.last7RoundsReward.delegatorReward

  // 30 rewards
  const earnedReward30Lpt =
    earnedRewardData && earnedRewardData.last30RoundsReward && earnedRewardData.last30RoundsReward.delegateReward
  const earnedReward30Cut =
    earnedRewardData && earnedRewardData.last30RoundsReward && earnedRewardData.last30RoundsReward.delegatorReward

  console.log(earnedRewardData)
  const earnedData = [
    {
      round: 'Next',
      lpt: +earnedRewardNextLpt > 0 ? toFixedDecimals(earnedRewardNextLpt) : '-',
      cut: +earnedRewardNextCut > 0 ? toFixedDecimals(earnedRewardNextCut) : '-',
    },
    {
      round: 'Last',
      lpt: +earnedRewardLastLpt > 0 ? toFixedDecimals(earnedRewardLastLpt) : '-',
      cut: +earnedRewardLastCut > 0 ? toFixedDecimals(earnedRewardLastCut) : '-',
    },
    {
      round: 'Last 7',
      lpt: +earnedReward7Lpt > 0 ? toFixedDecimals(earnedReward7Lpt) : '-',
      cut: +earnedReward7Cut > 0 ? toFixedDecimals(earnedReward7Cut) : '-',
    },
    {
      round: 'Last 30',
      lpt: +earnedReward30Lpt > 0 ? toFixedDecimals(earnedReward30Lpt) : '-',
      cut: +earnedReward30Cut > 0 ? toFixedDecimals(earnedReward30Cut) : '-',
    },
  ]

  const tableHead = (
    <TR>
      <TH>Round</TH>
      <THData>Delegate</THData>
      <THData>Your Cut</THData>
    </TR>
  )

  const card = (
    <Card title="Rewards, LPT" {...restProps}>
      <Description>
        Newly minted LPT claimed.{' '}
        <Tooltip description={'Livepeer.tools will update the reward data in the next rounds.'} />
      </Description>
      <StrippedListStyled tableHead={tableHead}>
        {earnedData.map((item, index) => {
          return (
            <TR key={index}>
              <TDTitle>{item.round}</TDTitle>
              <TDData>{item.lpt}</TDData>
              <TDData>{item.cut}</TDData>
            </TR>
          )
        })}
      </StrippedListStyled>
    </Card>
  )

  const earnedRewardCard =
    earnedRewardData && earnedRewardData.loadingEarnedRewardData ? (
      <SmallLoadingCard show={true} message={'Loading earned reward data...'} />
    ) : (
      card
    )

  return earnedRewardCard
}

export default EarnedRewards
