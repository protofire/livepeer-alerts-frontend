import React from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import './AccountSummaryHome.css'
//import Button from '../../Common/UI/Button/Button'
import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'
import { withStyles } from '@material-ui/core/styles'
import AccountSummaryStyle from './AccountSummaryStyle'
import Button from '../../Common/UI/CustomButtons/Button'

const AccountSummaryHome = props => {
  let disabledBtn = props.summary.status !== 'Bonded'
  const { classes } = props
  let subscriptionBtn

  if (props.userData.isSubscribed) {
    subscriptionBtn = (
      <>
        <Button
          onClick={props.onUnSubscribeBtnHandler}
          className="unsubscribeBtn"
          disabled={disabledBtn}
        >
          Unsubscribe
        </Button>
      </>
    )
  } else {
    subscriptionBtn = (
      <Button onClick={props.onSubscribeBtnHandler} disabled={disabledBtn} className="subscribeBtn">
        Subscribe
      </Button>
    )
  }
  let isSubscribed = props.userData.isSubscribed ? 'yes' : 'no'

  return (
    <div className={classes.container}>
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
    </div>
  )
}
export default withStyles(AccountSummaryStyle)(AccountSummaryHome)
