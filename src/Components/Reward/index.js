import React from 'react'
import RewardDescriptionDelegator from './RewardDescriptionDelegator'
import RewardDescriptionDelegate from './RewardDescriptionDelegate'
import Card from '../Common/Card'

const Reward = props => {
  const isDelegate = props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder'

  return (
    <Card>{isDelegate ? <RewardDescriptionDelegate {...props} /> : <RewardDescriptionDelegator {...props} />}</Card>
  )
}

export default Reward
