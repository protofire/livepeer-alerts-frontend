import React from 'react'
import * as displayTexts from '../AccountSummaryTexts'

const UserSubscribed = props => (
  <>
    <h2>{displayTexts.WELCOME_AGAIN}</h2>
    <h4>{props.userData.email}</h4>
    <h4>Subscription frequency: {props.userData.frequency}</h4>
    <button onClick={props.onUnSubscribeBtnHandler}>Unsubscribe</button>
  </>
)

export default UserSubscribed
