import React from 'react'
import { Emoji } from 'emoji-mart'
import styled from 'styled-components'

const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 15px;
  padding: 5px 0 0 0;
`

const Paragraph = styled.p`
  text-align: center;
  color: #333;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 10px;
  padding: 0;

  &:last-child {
    margin-bottom: 0;
  }
`
const A = styled.a`
  color: black;
`

const RewardDescriptionDelegator = props => {
  const description = props => {
    const { summary } = props
    let { status, delegateCalledReward, roundsUntilUnbonded } = summary

    let bondedDescription

    if (delegateCalledReward) {
      bondedDescription = 'The delegate has successfully claimed the last inflationary token rewards.'
    } else {
      bondedDescription = 'Unfortunately the delegate has not claimed the last inflationary token rewards.'
    }

    return {
      Bonded: <>{bondedDescription}</>,
      Pending: `A delegator enters the Pending state when it bonds from the Unbonded state.`,
      Unbonding:
        `You still have ` +
        roundsUntilUnbonded +
        ` round(s) left in the unbonding period. Each round lasts roughly one day.`,
      Unbonded: (
        <>
          You are not bonded to any delegate, therefore you are not earning LPT from the token inflation. Go ahead and
          delegate your LPT{' '}
          <A href="https://explorer.livepeer.org/transcoders" target="_blank" rel="noopener noreferrer">
            here
          </A>
        </>
      ),
      //  Unbonded: `As a delegator you are in the Unbounded state if you are not bonded to any delegate yet or if you have unbonded your tokens completely.`
    }[status]
  }

  const title = props => {
    const { summary } = props
    const { status, delegateCalledReward } = summary

    return {
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

  return (
    <>
      <Title>{title(props)}</Title>
      <Paragraph>{description(props)} </Paragraph>
    </>
  )
}

export default RewardDescriptionDelegator
