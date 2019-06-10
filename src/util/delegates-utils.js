import { getTranscoderRewards, getTranscoderTotalStake } from './apollo'
import { tokenAmountInUnits } from './utils'
import { BigNumber } from 'bignumber.js'

export const getTranscoderRoi = async transcoderAddress => {
  const rewards = await getTranscoderRewards(transcoderAddress)
  const totalStake = await getTranscoderTotalStake(transcoderAddress)

  if (rewards && totalStake) {
    const totalReward = rewards.reduce((total, reward) => {
      // Removes the cases in which the rewardToken is null
      const rewardTokenAmount = reward.rewardTokens ? reward.rewardTokens : 0
      const amount = tokenAmountInUnits(rewardTokenAmount)
      return total.plus(amount)
    }, new BigNumber(0))
    return totalReward / tokenAmountInUnits(totalStake)
  }
  return null
}
