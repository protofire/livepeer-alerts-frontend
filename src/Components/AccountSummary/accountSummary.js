import React, { Component } from 'react'
import axios from 'axios'

export class AccountSummaryComponent extends Component {
  state = {
    userData: {
      address: this.props.userData.address[0],
      isSubscribed: false,
      activated: null,
      id: null,
      email: 'test@altoros.com',
      frequency: 'weekly',
      activatedCode: null,
      createdAt: null
    }
  }

  componentDidMount = async () => {
    console.log('[AccountSummaryComponent.js] componentDidMount, userData: ', this.state.userData)
    let response
    try {
      /** Todo change once id is available **/
      response = await axios.get('/summary/' + this.state.userData.address)
      console.log('Recovered user subscribed: ', response.data)
      this.setState({
        userData: {
          ...this.state.userData,
          isSubscribed: true
        }
      })
    } catch (exception) {
      /** Check for 404 not found instead of simple exception **/
      console.log('[AccountSummary.js] exception on getRequest', exception)
      this.setState({
        userData: {
          ...this.state.userData,
          isSubscribed: false
        }
      })
    }
  }

  onSubscribeBtnHandler = async () => {
    console.log('[AccountSummary.js] subscribe btnHandler')
    let response
    const data = {
      email: this.state.userData.email,
      address: this.state.userData.address,
      frequency: this.state.userData.frequency
    }
    try {
      response = await axios.post('', data)
      console.log('User subscribed, response data: ', response.data)
      this.setState({
        userData: {
          ...this.state.userData,
          activated: response.data.activated,
          id: response.data._id,
          activatedCode: response.data.activated,
          createdAt: response.data.createdAt,
          isSubscribed: true
        }
      })
      console.log('Final state: ', this.state.userData)
    } catch (exception) {
      console.log('[AccountSummary.js] exception on postSubscription', exception)
    }
  }

  onUnSubscribeBtnHandler = async () => {
    console.log('[AccountSummary.js] unsubscribe btnHandler')
    const data = {
      username: 'test'
    }
    try {
      await axios.delete('/' + this.state.userData.id, data)
      console.log('User unsubscribed')
    } catch (exception) {
      console.log('[AccountSummary.js] exception on deleteSubscription', exception)
    }
  }

  render() {
    console.log('[AccountSummaryComponent.js] props: ', this.props)
    const { web3 } = this.props
    console.log('[AccountSummaryComponent.js]', web3)
    let content
    if (this.state.userData.isSubscribed) {
      content = <button onClick={this.onUnSubscribeBtnHandler}>Unsubscribe</button>
    } else {
      content = <button onClick={this.onSubscribeBtnHandler}>Subscribe</button>
    }
    return (
      <div>
        <h3>Account Summary Component</h3>
        {content}
      </div>
    )
  }
}
