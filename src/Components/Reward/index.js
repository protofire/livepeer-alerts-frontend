import React from 'react'
import RewardDescriptionDelegator from './RewardDescriptionDelegator'
import RewardDescriptionDelegate from './RewardDescriptionDelegate'
import Card from '../Common/Card'
import SmallLoadingCard from '../Common/SmallLoadingCard'

const Reward = props => {
  const { summary } = props
  const isDelegate = summary && summary.role && summary.role.toLowerCase() === 'transcoder'

  const rewardCard =
    summary && summary.loadingSummary ? (
      <SmallLoadingCard show={true} message={'Loading reward data...'} />
    ) : (
      <Card>{isDelegate ? <RewardDescriptionDelegate {...props} /> : <RewardDescriptionDelegator {...props} />}</Card>
    )

  return rewardCard
}

export default Reward
