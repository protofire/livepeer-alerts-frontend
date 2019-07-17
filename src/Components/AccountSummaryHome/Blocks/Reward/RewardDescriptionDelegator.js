import React from 'react'
import { truncateStringInTheMiddle } from '../../../../utils'
import { Emoji } from 'emoji-mart'

const RewardDescriptionDelegator = props => {
  const description = props => {
    const { summary } = props
    let { status, delegateCalledReward, delegateAddress, startRound, roundsUntilUnbonded } = summary

    const delegateAddressUrl = `https://explorer.livepeer.org/accounts/${delegateAddress}/transcoding`
    const delegateAddressTruncated = truncateStringInTheMiddle(delegateAddress)

    let bondedDescription
    if (delegateCalledReward) {
      bondedDescription = <>The delegate has successfully claimed the last inflationary token rewards.</>
    } else {
      bondedDescription = <>Unfortunately the delegate has not claimed the last inflationary token rewards.</>
    }

    return (
      <>
        {
          {
            Bonded: (
              <>
                You are bonded to delegate{' '}
                <a href={delegateAddressUrl} target="_blank" rel="noopener noreferrer">
                  {delegateAddressTruncated}
                </a>{' '}
                since round #{startRound}.<br />
                {bondedDescription}
              </>
            ),
            Pending: `A delegator enters the Pending state when it bonds from the Unbonded state.`,
            Unbonding:
              `You still have ` +
              roundsUntilUnbonded +
              ` round(s) left in the unbonding period. Each round lasts roughly one day.`,
            Unbonded: (
              <>
                You are not bonded to any delegate, therefore you are not earning LPT from the token inflation. Go ahead
                and delegate your LPT{' '}
                <a href="https://explorer.livepeer.org/transcoders" target="_blank" rel="noopener noreferrer">
                  here
                </a>
              </>
            ),
            //  Unbonded: `As a delegator you are in the Unbounded state if you are not bonded to any delegate yet or if you have unbonded your tokens completely.`
          }[status]
        }
      </>
    )
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
            Unbonded: `Your current status is: Unbonded`,
          }[status]
        }
      </>
    )
  }

  return (
    <>
      <div>
        <h3>{title(props)}</h3>
        <p>{description(props)} </p>
      </div>
    </>
  )
}

export default RewardDescriptionDelegator
