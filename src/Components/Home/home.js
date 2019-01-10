import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './home.css'
import logger from '../../utils'
import { withRouter } from 'react-router-dom'
import HomeCard from './HomeCard/HomeCard.js'

export class HomeComponent extends Component {
  state = {
    toastId: 1,
    displayMsg: null,
    error: false
  }

  onGetStartedBtnHandler = () => {
    logger.log('[Home.js] getStartedBtnHandler')
    this.props.history.push('/account')
  }
  sendToast = (toastTime, callback) => {
    let time = 2000
    if (toastTime) {
      time = toastTime
    }
    let displayMsg = this.state.displayMsg
    if (!toast.isActive(this.state.toastId)) {
      if (this.state.error) {
        toast.error(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: time,
          toastId: this.state.toastId,
          onClose: callback
        })
      } else {
        toast.success(displayMsg, {
          position: toast.POSITION.TOP_RIGHT,
          progressClassName: 'Toast-progress-bar',
          autoClose: time,
          toastId: this.state.toastId,
          onClose: callback
        })
      }
      /** TODO -- CHECK IF THERE IS ANOTHER WAY TO USE THIS, THIS IS FOR TESTING THAT THE TOAST IS CALLED **/
      if (this.props.toastOpenedHandlerTest) {
        this.props.toastOpenedHandlerTest(displayMsg)
      }
    }
  }

  componentDidMount() {
    logger.log('[Home.js] componentDidMount: ')
    /** If we get redirected with an error msg, we should display it **/
    if (this.props.location && this.props.location.state && this.props.location.state.error) {
      this.setState(
        {
          error: this.props.location.state.error,
          displayMsg: this.props.location.state.displayMsg
        },
        () => {
          this.sendToast()
        }
      )
    }
  }

  render() {
    // TODO PUT GET STARTED BUTTON; REVERT OLD CODE AND CHECK IT

    return (
      <>
        <HomeCard onClick={this.onGetStartedBtnHandler} />
        <ToastContainer autoClose={2000} />
      </>
    )
  }
}
export default withRouter(HomeComponent)
