import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './home.css'

export class HomeComponent extends Component {
  state = {
    toastId: 1
  }

  onGetStartedBtnHandler = () => {
    const { web3 } = this.props
    console.log('[Home.js] props: ', this.props)
    console.log('Web3: ', web3)
    if (typeof web3 === 'undefined') {
      this.sendToastError()
    } else {
      console.log('Web3 connected ', web3.currentProvider.isConnected())
      this.props.history.push('/account')
    }
  }

  sendToastError = toastTime => {
    if (!toast.isActive(this.state.toastId)) {
      toast.error('Please install metamask and come back!', {
        position: toast.POSITION.TOP_RIGHT,
        progressClassName: 'Toast-progress-bar',
        autoClose: toastTime,
        toastId: this.state.toastId
      })
    }
  }

  componentDidMount() {
    if (!this.props.web3) {
      this.sendToastError(6000)
    }
  }

  render() {
    let content

    content = (
      <>
        <h3>Hello LivePeer Alerts!</h3>
        <p>Descriptions and details</p>
        <button onClick={this.onGetStartedBtnHandler}>Get Started</button>
        {/*      <Link to="/account">

        </Link>*/}
        <ToastContainer autoClose={3000} />
      </>
    )

    return <div>{content}</div>
  }
}
