import React from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import './UserSubscribed.css'
import Button from '../../Common/UI/Button/Button'
import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'

const UserSubscribed = props => {
  let disabledBtn = props.summary.status !== 'Bonded'
  let subscriptionBtn
  if (props.userData.isSubscribed) {
    subscriptionBtn = <Button clicked={props.onUnSubscribeBtnHandler}>Unsubscribe</Button>
  } else {
    subscriptionBtn = (
      <Button clicked={props.onSubscribeBtnHandler} disabled={disabledBtn}>
        Subscribe
      </Button>
    )
  }
  return (
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
        {subscriptionBtn}
      </div>
    </>
  )
}
export default UserSubscribed
