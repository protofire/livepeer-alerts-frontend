import React, { Component } from 'react'
import Web3 from 'web3'

const withWeb3Provider = WrappedComponent => {
  return class extends Component {
    state = {
      web3: null,
      authenticated: false
    }

    loadWeb3 = async () => {
      let web3Instance
      console.log('[Web3Provider.js] loadWeb3')
      /** We check if metamask is installed **/
      if (typeof window.web3 !== 'undefined') {
        /** We get the provider of web3 injected by metamask **/
        console.log('[Web3Provider.js] getting web3 instance')
        web3Instance = new Web3(window.web3.currentProvider)

        this.setState({
          web3: web3Instance,
          authenticated: web3Instance.currentProvider.isConnected()
        })
      }
    }

    async componentDidMount() {
      console.log('[Web3Provider.js] componentDidMount')
      await this.loadWeb3()
      console.log('[Web3Provider.js] await finished')
    }

    render() {
      let content
      /*        if (this.state.web3) {
          console.log("[Web3Provider.js] rendering first case");
          content = <WrappedComponent {...this.props} web3={this.state.web3} authenticated/>
        } else {
          console.log("[Web3Provider.js] rendering second case");
          content = <h1>Please install metamask and come back!</h1>
        }*/

      content = (
        <WrappedComponent
          {...this.props}
          web3={this.state.web3}
          authenticated={this.state.authenticated}
        />
      )
      return content
    }
  }
}

export default withWeb3Provider
