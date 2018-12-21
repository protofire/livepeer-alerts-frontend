import React, { Component } from 'react'
import Web3 from 'web3'
import * as failReasons from './Web3FailReasons'

const withWeb3Provider = WrappedComponent => {
  return class extends Component {
    state = {
      web3: null,
      userData: {
        authenticated: false,
        reason: null,
        address: null,
        currentNetwork: null
      },
      render: false
    }

    loadWeb3 = async () => {
      let web3Instance
      let userAddress
      let userNetwork
      console.log('[Web3Provider.js] loadWeb3')
      /** We check if metamask is installed, either the new version or the legacy one **/
      if (window.ethereum) {
        console.log('[Web3Provider.js] getting web3 new instance')
        web3Instance = new Web3(window.ethereum)
        try {
          /** Request access to the user **/
          console.log('[Web3Provider.js] requesting user permissions')
          await window.ethereum.enable()
          userAddress = await web3Instance.eth.getAccounts()
          userAddress = userAddress[0]
          userNetwork = await web3Instance.eth.net.getId()
          console.log('[Web3Provider.js] user with web3 ethereum authenticated')
          /** The user accepted the app, now it's authenticated **/
          this.setState({
            web3: web3Instance,
            userData: {
              authenticated: true,
              address: userAddress,
              currentNetwork: userNetwork
            },
            render: true
          })
          /** We subscribe to the event that detects if the user has changed the account **/
          web3Instance.currentProvider.publicConfigStore.on(
            'update',
            this.onUserAccountChangeHandler
          )
        } catch (error) {
          /** The user denied the app, it's not authenticated **/
          console.log('[Web3Provider.js] user denied access')
          this.setState({
            web3: web3Instance,
            userData: {
              authenticated: false,
              reason: failReasons.NO_PERMISSIONS
            },
            render: true
          })
          console.log('[Web3Provider.js] user with ethereum denied the access')
        }
      } else if (window.web3) {
        console.log('[Web3Provider.js] getting web3 legacy instance')
        web3Instance = new Web3(window.web3.currentProvider)
        userAddress = await web3Instance.eth.getAccounts()
        userAddress = userAddress[0]
        userNetwork = await web3Instance.eth.net.getId()
        this.setState({
          web3: web3Instance,
          userData: {
            authenticated: true,
            address: userAddress,
            currentNetwork: userNetwork
          },
          render: true
        })
        console.log('[Web3Provider.js] user with web3 legacy authenticated')
        /** We subscribe to the event that detects if the user has changed the account **/
        web3Instance.currentProvider.publicConfigStore.on('update', this.onUserAccountChangeHandler)
      } else {
        /** The user does not have web3 **/
        this.setState({
          render: true,
          userData: {
            authenticated: false,
            reason: failReasons.NO_WEB3
          }
        })
        console.log('[Web3Provider.js] user does not have web3')
      }
    }

    onUserAccountChangeHandler = userAuthData => {
      console.log('[Web3Provider.js] onUserAccountChangeHandler with data', userAuthData)
      this.setState({
        userData: {
          address: userAuthData.selectedAddress,
          currentNetwork: userAuthData.networkVersion
        }
      })
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
          userData={this.state.userData}
          render={this.state.render}
        />
      )
      return content
    }
  }
}

export default withWeb3Provider
