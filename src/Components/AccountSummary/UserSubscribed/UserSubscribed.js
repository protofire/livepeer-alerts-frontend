import React, { Component } from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import './UserSubscribed.css'
import Button from '../../Common/UI/Button/Button'
import Spinner from '../../Common/UI/Spinner/Spinner'
import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'

const UserSubscribed = props => {
  let contentActivated = 'no'
  let displayMsg = displayTexts.LOADING_SUBSCRIPTION_DATA

  if (props.userData.activated > 0) {
    contentActivated = 'yes'
  }
  let time = new Date(props.userData.createdAt).toLocaleString()

  let content = (
    <>
      <h3>{displayMsg}</h3>
      <Spinner />
    </>
  )
  content = (
    <>
      <h1>{displayTexts.WELCOME_AGAIN}</h1>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Account Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className="subscriberInfoTable">
                <tbody>
                  <tr>
                    <td>Address</td>
                    <td>{props.userData.address}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{props.userData.email}</td>
                  </tr>
                  <tr>
                    <td>Activated</td>
                    <td>{contentActivated}</td>
                  </tr>
                  <tr>
                    <td>Created at</td>
                    <td>{time}</td>
                  </tr>
                  <tr>
                    <td>Subscription frequency</td>
                    <td>{props.userData.frequency}</td>
                  </tr>
                  <tr>
                    <td>ETH Balance</td>
                    <td>{props.userData.ethBalance}</td>
                  </tr>
                  <tr>
                    <td>LivePeer Balance</td>
                    <td>{props.lpBalance}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <AccountSummaryData summary={props.summary} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="subscriptionBtn">
        <Button clicked={props.onSubscriptionChangeHandler}>Change Subscription</Button>
        <Button clicked={props.onUnSubscribeBtnHandler}>Unsubscribe</Button>
      </div>
    </>
  )

  return content
}
export default UserSubscribed
