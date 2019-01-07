import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './home.css'
import * as failReasons from '../Common/Hoc/Web3Provider/Web3FailReasons'
import * as texts from '../Common/UI/Texts/Texts'
import logger from '../../utils'
import HomeCard from './HomeCard'

export class HomeComponent extends Component {
  state = {
    toastId: 1
  }

  onGetStartedBtnHandler = () => {
    logger.log('[Home.js] getStartedBtnHandler')
    this.props.history.push('/account')
  }

  sendToastError = toastTime => {
    let time = 6000
    if (toastTime) {
      time = toastTime
    }
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
        autoClose: time,
        toastId: this.state.toastId
      })
      /** TODO -- CHECK IF THERE IS ANOTHER WAY TO USE THIS, THIS IS FOR TESTING THAT THE TOAST IS CALLED **/
      if (this.props.toastOpenedHandlerTest) {
        this.props.toastOpenedHandlerTest(errorMsg)
      }
    }
  }

  componentDidMount() {
    logger.log('[Home.js] componentDidMount: ')
  }

  render() {
    // TODO PUT GET STARTED BUTTON; REVERT OLD CODE AND CHECK IT

    return <HomeCard onClick={this.onGetStartedBtnHandler} />
  }
}
