import React from 'react'
import styled from 'styled-components'
import { MdCheckCircle, MdCancel } from 'react-icons/md'

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

const RewardDescriptionDelegate = props => {
  const description = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    let bondedDescription
    if (delegateCalledReward) {
      bondedDescription = (
        <InfoTextContainer>
          <GreenIcon />{' '}
          <InfoText>Your node has successfully made the last round’s inflationary tokens reward call</InfoText>
        </InfoTextContainer>
      )
    } else {
      bondedDescription = (
        <InfoTextContainer>
          <RedIcon />
          <InfoText>
            There might be something wrong with your node given that the last round reward call was not made yet.
          </InfoText>
        </InfoTextContainer>
      )
    }

    return bondedDescription
  }

  return <Paragraph>{description(props)}</Paragraph>
}

export default RewardDescriptionDelegate
