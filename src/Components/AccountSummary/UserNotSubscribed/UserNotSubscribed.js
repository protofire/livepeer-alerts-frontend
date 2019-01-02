import React from 'react'
import * as displayTexts from '../AccountSummaryTexts'

const UserNotSubscribed = props => {
  return (
    <>
      <h2>{displayTexts.WELCOME_NOT_SUBSCRIBED}</h2>
      <button onClick={props.onSubscribeBtnHandler}>Subscribe</button>
    </>
  )
}

export default UserNotSubscribed
