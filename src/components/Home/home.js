import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './home.css'

export class HomeComponent extends Component {
    onGetStartedBtnHandler = () => {
    const { web3 } = this.props;
    console.log("[Home.js] web3: ", web3);
    if(!web3){
      toast.error("Please install metamask and come back!", {
        position: toast.POSITION.TOP_RIGHT,
        progressClassName: 'Toast-progress-bar'
      });
    }
    else {
      console.log("Web3 connected ", web3.isConnected())
      this.props.history.push('/account');
    }
  };

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
