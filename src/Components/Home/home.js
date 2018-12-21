import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './home.css'
import * as failReasons from '../Common/Hoc/Web3Provider/Web3FailReasons'
import * as texts from '../Common/UI/Texts/Texts'

export class HomeComponent extends Component {
  state = {
    toastId: 1
  }

  onGetStartedBtnHandler = () => {
    const { web3 } = this.props
    console.log('[Home.js] props: ', this.props)
    if (!web3 || (web3 && !this.props.userData.authenticated)) {
      this.sendToastError()
    } else {
      console.log('Web3 connected ', web3.currentProvider.isConnected())
      this.props.history.push('/account')
    }
  }

  sendToastError = toastTime => {
    let cause = this.props.userData.reason
    let errorMsg
    switch (cause) {
      case failReasons.NO_PERMISSIONS: {
        errorMsg = texts.NO_PERMISSIONS
        break
      }
      case failReasons.NO_WEB3: {
        errorMsg = texts.NO_WEB3
        break
      }
      case failReasons.WRONG_NETWORK: {
        errorMsg = texts.WRONG_NETWORK
        break
      }
      default: {
        errorMsg = texts.DEFAULT_ERROR
        break
      }
    }
    if (!toast.isActive(this.state.toastId) && this.props.render) {
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
        progressClassName: 'Toast-progress-bar',
        autoClose: toastTime,
        toastId: this.state.toastId
      })
    }
  }

  componentDidMount() {
    console.log('[Home.js] componentDidMount, props: ', this.props)
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
        <ToastContainer autoClose={3000} />
      </>
    )

    return <div>{content}</div>
  }
}
