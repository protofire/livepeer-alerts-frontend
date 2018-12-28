import React, { Component } from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import './UserSubscribed.css'
import Button from '../../Common/UI/Button/Button'
import axios from 'axios'
import Spinner from '../../Common/UI/Spinner/Spinner'
import AccountSummaryData from '../AccountSummaryData/AccountSummaryData'

export class UserSubscribed extends Component {
  state = {
    render: false,
    displayMsg: displayTexts.LOADING_SUBSCRIPTION_DATA
  }

  componentDidMount = async () => {
    console.log('[UserSubscribed] componentDidMount')
    let response
    try {
      response = await axios.get('/summary/' + this.props.userData.address)
      this.setState({
        render: true,
        summary: {
          ...this.props.summary,
          bondedAmount: response.data.bondedAmount,
          fees: response.data.fees,
          lastClaimRound: response.data.lastClaimRound,
          startRound: response.data.startRound,
          status: response.data.status,
          withdrawRound: response.data.withdrawRound
        }
      })
      console.log('Response data: ', response)
    } catch (exception) {
      console.log('Exception problem: ', exception)
      this.setState({
        render: true
      })
    }
  }

  render() {
    let contentActivated = 'no'
    if (this.props.userData.activated > 0) {
      contentActivated = 'yes'
    }
    let time = new Date(this.props.userData.createdAt).toLocaleString()

    let content = (
      <>
        <h3>{this.state.displayMsg}</h3>
        <Spinner />
      </>
    )

    if (this.state.render) {
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
                    <thead>
                      <tr>
                        <th colSpan="2">Subscriber Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.userData.email}</td>
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
                        <td>{this.props.userData.frequency}</td>
                      </tr>
                      <tr>
                        <td>ETH Balance</td>
                        <td>{this.props.userData.ethBalance}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <AccountSummaryData summary={this.state.summary} />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="subscriptionBtn">
            <Button clicked={this.props.onSubscriptionChangeHandler}>Change Subscription</Button>
            <Button clicked={this.props.onUnSubscribeBtnHandler}>Unsubscribe</Button>
          </div>
        </>
      )
    }

    return <div>{content}</div>
  }
}

export default UserSubscribed
