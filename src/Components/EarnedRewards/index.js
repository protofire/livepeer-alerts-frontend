import React from 'react'
import Card from '../Common/Card'
import StrippedList, { TR, TD, TH } from '../Common/StrippedList'
import Tooltip from '../Common/Tooltip'
import styled from 'styled-components'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import { decimalPlaces } from '../../Utils'

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

  const earnedData = [
    {
      round: 'Next',
      lpt: decimalPlaces(earnedRewardData && earnedRewardData.nextReward && earnedRewardData.nextReward.delegateReward),
      cut: decimalPlaces(
        earnedRewardData && earnedRewardData.nextReward && earnedRewardData.nextReward.delegatorReward,
      ),
    },
    {
      round: 'Last',
      lpt: decimalPlaces(
        earnedRewardData && earnedRewardData.lastRoundReward && earnedRewardData.lastRoundReward.delegateReward,
      ),
      cut: decimalPlaces(
        earnedRewardData && earnedRewardData.lastRoundReward && earnedRewardData.lastRoundReward.delegatorReward,
      ),
    },
    {
      round: 'Last 7',
      lpt: decimalPlaces(
        earnedRewardData && earnedRewardData.last7RoundsReward && earnedRewardData.last7RoundsReward.delegateReward,
      ),
      cut: decimalPlaces(
        earnedRewardData && earnedRewardData.last7RoundsReward && earnedRewardData.last7RoundsReward.delegatorReward,
      ),
    },
    {
      round: 'Last 30',
      lpt: decimalPlaces(
        earnedRewardData && earnedRewardData.last30RoundsReward && earnedRewardData.last30RoundsReward.delegateReward,
      ),
      cut: decimalPlaces(
        earnedRewardData && earnedRewardData.last30RoundsReward && earnedRewardData.last30RoundsReward.delegatorReward,
      ),
    },
  ]

  const tableHead = (
    <TR>
      <TH>Round</TH>
      <THData>LPT</THData>
      <THData>Your Cut</THData>
    </TR>
  )

  const card = (
    <Card title="Earned Rewards" {...restProps}>
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
