import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3>Hello LivePeer Alerts!</h3>
        <p>Descriptions and details</p>
        <Link to="/account">
          <button>Get Started</button>
        </Link>
      </div>
    )
  }
}
