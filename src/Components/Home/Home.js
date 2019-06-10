import 'react-toastify/dist/ReactToastify.css'
import HomeCard from './HomeCard/HomeCard.js'
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import logdown from 'logdown'
const logger = logdown('Livepeer:Home')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export class HomeComponent extends Component {
  state = {
    toastId: 1,
    displayMsg: null,
    error: false
  }

  onGetStartedBtnHandler = () => {
    logger.log('Fire event getStartedBtnHandler')
    this.props.history.push('/account')
  }

  onDemoBtnHandler = () => {
    logger.log('Fire event demoBtnHandler')
    this.props.history.push('/account/demo')
  }

  sendToast = (toastTime, callback) => {
    let time = 3500
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
      // TODO -- CHECK IF THERE IS ANOTHER WAY TO USE THIS, THIS IS FOR TESTING THAT THE TOAST IS CALLED
      if (this.props.toastOpenedHandlerTest) {
        this.props.toastOpenedHandlerTest(displayMsg)
      }
    }
  }

  componentDidMount() {
    logger.log('Fire event componentDidMount')
    // If we get redirected with an error msg, we should display
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
    return (
      <>
        <HomeCard onClick={this.onGetStartedBtnHandler} onDemoClick={this.onDemoBtnHandler} />
        <ToastContainer autoClose={2000} />
      </>
    )
  }
}
export default withRouter(HomeComponent)
