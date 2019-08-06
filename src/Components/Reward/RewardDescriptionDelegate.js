import React from 'react'
import styled from 'styled-components'
import { MdCheckCircle, MdCancel } from 'react-icons/md'

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

const Subtitle = styled.h2`
  color: ${props => props.theme.cards.titleColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.31;
  margin: 0;
  text-align: ${props => props.titleAlign};
`

const RedIcon = styled(MdCancel)`
  color: red;
`

const GreenIcon = styled(MdCheckCircle)`
  color: green;
`

const RewardDescriptionDelegate = props => {
  const description = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    let bondedDescription
    if (delegateCalledReward) {
      bondedDescription = (
        <Subtitle>
          <GreenIcon /> Your node has successfully made the last round’s inflationary tokens reward call
        </Subtitle>
      )
    } else {
      bondedDescription = (
        <Subtitle>
          <RedIcon />
          There might be something wrong with your node given that the last round reward call was not made yet.
        </Subtitle>
      )
    }

    return bondedDescription
  }

  return <Paragraph>{description(props)}</Paragraph>
}

export default RewardDescriptionDelegate
