import React, { Component } from 'react'
import * as displayTexts from '../AccountSummaryTexts'

export class UserNotSubscribed extends Component {
  render() {
    return (
      <>
        <h2>{displayTexts.WELCOME_NOT_SUBSCRIBED}</h2>
        <button onClick={this.props.onSubscribeBtnHandler}>Subscribe</button>
      </>
    )
  }
}
export default UserNotSubscribed
