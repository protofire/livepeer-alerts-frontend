import React from 'react'
import { Emoji } from 'emoji-mart'

const RewardDescriptionDelegate = props => {
  const title = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    return (
      <>
        <p>
          {delegateCalledReward ? (
            <Emoji emoji={{ id: 'thumbsup', skin: 3 }} size={18} />
          ) : (
            <Emoji emoji={{ id: 'thumbsdown', skin: 3 }} size={18} />
          )}{' '}
          Inflationary reward call status
        </p>
      </>
    )
  }

  const description = props => {
    const { summary } = props
    const { delegateCalledReward } = summary

    let bondedDescription
    if (delegateCalledReward) {
      bondedDescription = (
        <>
          <p>Your node has successfully made the last round’s inflationary tokens reward call.</p>
        </>
      )
    } else {
      bondedDescription = (
        <p>There might be something wrong with your node given that the last round reward call was not made yet.</p>
      )
    }

    return bondedDescription
  }

  return (
    <>
      <h3>{title(props)}</h3>
      <div>{description(props)}</div>
    </>
  )
}

export default RewardDescriptionDelegate
