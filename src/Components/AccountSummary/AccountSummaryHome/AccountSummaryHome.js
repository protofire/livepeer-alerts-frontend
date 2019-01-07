import React from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import './AccountSummaryHome.css'
import Button from '../../Common/UI/Button/Button'
import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'

const AccountSummaryHome = props => {
  let disabledBtn = props.summary.status !== 'Bonded'
  let subscriptionBtn
  if (props.userData.isSubscribed) {
    subscriptionBtn = (
      <>
        <Button
          clicked={props.onUnSubscribeBtnHandler}
          className="unsubscribeBtn"
          disabled={disabledBtn}
        >
          Unsubscribe
        </Button>
      </>
    )
  } else {
    subscriptionBtn = (
      <Button clicked={props.onSubscribeBtnHandler} disabled={disabledBtn} className="subscribeBtn">
        Subscribe
      </Button>
    )
  }
  let isSubscribed = props.userData.isSubscribed ? 'yes' : 'no'
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
                  <tr>
                    <td>Subscribed</td>
                    <td>{isSubscribed}</td>
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

      <div className="subscriptionBtn">{subscriptionBtn}</div>
    </>
  )
}
export default AccountSummaryHome
