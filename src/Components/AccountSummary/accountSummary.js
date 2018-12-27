import React, { Component } from 'react'

export class AccountSummaryComponent extends Component {
  render() {
    const web3 = this.props
    console.log('[AccountSummaryComponent]', web3.eth)

    return (
      <div>
        <h3>Account Summary Component</h3>
        <button>Subscribe</button>
      </div>
    )
  }
}
