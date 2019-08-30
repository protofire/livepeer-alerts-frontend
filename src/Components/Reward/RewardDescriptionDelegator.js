import React from 'react'
import styled from 'styled-components'
import { MdCheckCircle, MdCancel } from 'react-icons/md'

const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 10px;
  padding: 0;
`

const Paragraph = styled.div`
  color: #333;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 10px;
  padding: 0;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`
const InfoTextContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

const InfoText = styled.p`
  color: ${props => props.theme.cards.titleColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.31;
  margin: 0 0 0 15px;
  text-align: left;
`

const RedIcon = styled(MdCancel)`
  color: ${props => props.theme.colors.alert};
  height: ${props => props.theme.icons.height};
  width: ${props => props.theme.icons.width};
`

const GreenIcon = styled(MdCheckCircle)`
  color: ${props => props.theme.colors.secondary};
  height: ${props => props.theme.icons.height};
  width: ${props => props.theme.icons.width};
`

const A = styled.a`
  color: #000;
`

const RewardDescriptionDelegator = props => {
  const description = props => {
    const { summary } = props
    let { status, delegateCalledReward, roundsUntilUnbonded } = summary

    let bondedDescription

    if (delegateCalledReward) {
      bondedDescription = (
        <InfoTextContainer>
          <GreenIcon />
          <InfoText>The delegate has successfully claimed the last inflationary token rewards.</InfoText>
        </InfoTextContainer>
      )
    } else {
      bondedDescription = (
        <InfoTextContainer>
          <RedIcon />
          <InfoText>Unfortunately the delegate has not claimed the last inflationary token rewards.</InfoText>
        </InfoTextContainer>
      )
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
    const { status } = summary

    return {
      Bonded: null,
      Pending: `You are currently in the Pending state`,
      Unbonding: `You are currently in the Unbonding state`,
      Unbonded: `Your current status is: Unbonded`,
    }[status]
  }

  return (
    <>
      <Title>{title(props)}</Title>
      <Paragraph>{description(props)}</Paragraph>
    </>
  )
}

export default RewardDescriptionDelegator
