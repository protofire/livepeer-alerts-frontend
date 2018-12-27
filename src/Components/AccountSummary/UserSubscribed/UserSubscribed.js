import React, { Component } from 'react'
import * as displayTexts from '../AccountSummaryTexts'
import './UserSubscribed.css'
import Button from '../../Common/UI/Button/Button'
import axios from 'axios'
import Spinner from '../../Common/UI/Spinner/Spinner'

export class UserSubscribed extends Component {
  state = {
    render: false,
    displayMsg: displayTexts.LOADING_SUBSCRIPTION_DATA,
    summary: {
      bondedAmount: '',
      delegateAddress: '',
      fees: '',
      lastClaimRound: '',
      startRound: '',
      status: '',
      withdrawRound: ''
    }
  }

  componentDidMount = async () => {
    console.log('[UserSubscribed] componentDidMount')
    let response
    try {
      response = await axios.get('/summary/' + this.props.userData.address)
      this.setState({
        render: true,
        summary: {
          bondedAmount: response.data.bondedAmount,
          delegateAddress: response.data.delegateAddress,
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
          <p>{this.props.userData.email}</p>
          <p>Subscription frequency: {this.props.userData.frequency}</p>
          <p>Activated: {contentActivated}</p>
          <p>Created at: {time}</p>
          <p>BondedAmount {this.state.summary.bondedAmount}</p>
          <p>DelegateAddress {this.state.summary.delegateAddress}</p>
          <p>Fees {this.state.summary.fees}</p>
          <p>LastClaimRound {this.state.summary.lastClaimRound}</p>
          <p>StartRound {this.state.summary.startRound}</p>
          <p>Status {this.state.summary.status}</p>
          <p>WithdrawRound {this.state.summary.withdrawRound}</p>

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
