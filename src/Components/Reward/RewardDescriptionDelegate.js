import React from 'react'
import { Emoji } from 'emoji-mart'
import styled from 'styled-components'

const Title = styled.h2`
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

const RewardDescriptionDelegate = props => {
  const title = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    return (
      <Paragraph>
        {delegateCalledReward ? (
          <Emoji emoji={{ id: 'thumbsup', skin: 3 }} size={18} />
        ) : (
          <Emoji emoji={{ id: 'thumbsdown', skin: 3 }} size={18} />
        )}{' '}
        Inflationary reward call status
      </Paragraph>
    )
  }

  const description = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    let bondedDescription
    if (delegateCalledReward) {
      bondedDescription = (
        <Paragraph>Your node has successfully made the last round’s inflationary tokens reward call.</Paragraph>
      )
    } else {
      bondedDescription = (
        <Paragraph>
          There might be something wrong with your node given that the last round reward call was not made yet.
        </Paragraph>
      )
    }

    return bondedDescription
  }

  return (
    <>
      <Title>{title(props)}</Title>
      {description(props)}
    </>
  )
}

export default RewardDescriptionDelegate
