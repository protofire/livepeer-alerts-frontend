import React from 'react'
import RewardDescriptionDelegator from './RewardDescriptionDelegator'
import RewardDescriptionDelegate from './RewardDescriptionDelegate'
import Card from '../Common/Card'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import styled from 'styled-components'

const PaddedCard = styled(Card)`
  padding-bottom: 15px;
  padding-top: 15px;
`

const Reward = props => {
  const { summary } = props
  const isDelegate = summary && summary.role && summary.role.toLowerCase() === 'transcoder'

  const rewardCard =
    summary && summary.loadingSummary ? (
      <SmallLoadingCard show={true} message={'Loading reward calling status...'} />
    ) : (
      <PaddedCard>
        {isDelegate ? <RewardDescriptionDelegate {...props} /> : <RewardDescriptionDelegator {...props} />}
      </PaddedCard>
    )

  return rewardCard
}

export default Reward
