import React from 'react'
import Card from '../../../Common/UI/Card/Card.js'
import { Emoji } from 'emoji-mart'

const RewardDescriptionDelegate = props => {
  const { classes } = props

  const description = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    let bondedDescription
    if (delegateCalledReward) {
      bondedDescription = (
        <>
          <p>
            You has been successfully claimed the last inflationary token rewards at round{' '}
            {summary.lastRewardRound}{' '}
          </p>
          <p>Your feeshare is {summary.feeShare}%</p>
        </>
      )
    } else {
      bondedDescription = <p>You did not claimed the last inflationary token rewards</p>
    }

    return bondedDescription
  }

  const title = props => {
    const { summary } = props
    const { status, delegateCalledReward } = summary

    return (
      <>
        {
          {
            Bonded: (
              <>
                {delegateCalledReward ? (
                  <Emoji emoji={{ id: 'thumbsup', skin: 3 }} size={18} />
                ) : (
                  <Emoji emoji={{ id: 'thumbsdown', skin: 3 }} size={18} />
                )}{' '}
                Delegate reward calling status
              </>
            ),
            Pending: `You are currently in the Pending state`,
            Unbonding: `You are currently in the Unbonding state`,
            Unbonded: `Your current status is: Unbonded`
          }[status]
        }
      </>
    )
  }

  return (
    <>
      <Card className={classes.cardItem}>
        <h3 className={classes.rewardTitle}>{title(props)}</h3>
        <div className={classes.rewardText}>{description(props)}</div>
      </Card>
    </>
  )
}

export default RewardDescriptionDelegate
