import { getTranscoderRewards, getTranscoderTotalStake } from './apollo'
import { tokenAmountInUnits } from './utils'

export const getTranscoderRoi = async transcoderAddress => {
  const rewards = await getTranscoderRewards(transcoderAddress)
  const totalStake = await getTranscoderTotalStake(transcoderAddress)

  if (rewards && totalStake) {
    const totalReward = rewards.reduce((total, reward) => {
      const amount = tokenAmountInUnits(reward.rewardTokens)
      return total + amount
    }, 0)
    return totalReward / tokenAmountInUnits(totalStake)
  }
  return null
}
