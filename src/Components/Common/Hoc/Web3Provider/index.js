import * as failReasons from './Web3FailReasons'
import * as texts from '../../Texts'
import React, { Component } from 'react'
import Web3 from 'web3'
import logdown from 'logdown'
import FullLoading from '../../FullLoading'

const logger = logdown('Livepeer:Web3Provider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const defaultState = {
  web3: null,
  userData: {
    authenticated: false,
    reason: null,
    address: null,
    currentNetwork: null,
  },
  render: false,
  requestingAuth: false,
  displayMsg: texts.WAITING_AUTHORIZATION,
  error: false,
}

const Web3Context = React.createContext(defaultState)

export const Web3ContextConsumer = Web3Context.Consumer

class Web3Provider extends Component {
  state = defaultState

  loadWeb3 = async () => {
    logger.log('LoadWeb3')
    // We check if metamask is installed, either the new version or the legacy one
    if (window.ethereum) {
      await this.loadWeb3LastVersion()
    } else if (window.web3) {
      await this.loadWeb3Legacy()
    } else {
      // The user does not have web3
      logger.log('User does not have web3')
      throw new Error(texts.NO_WEB3)
    }
  }

  loadWeb3Legacy = async () => {
    logger.log('Getting web3 legacy instance')
    let web3Instance
    web3Instance = new Web3(window.web3.currentProvider)
    await this.loadUserDataFromWeb3(web3Instance)
  }

  loadWeb3LastVersion = async () => {
    logger.log('Getting web3 new instance')
    let web3Instance
    web3Instance = new Web3(window.ethereum)
    try {
      // Request access to the user
      logger.log('Requesting user permissions')
      let enabledAddress = await window.ethereum.enable()
      // Could be deleted, this is done for make easier the test
      if (!enabledAddress) {
        throw new Error(failReasons.NO_PERMISSIONS)
      }
      logger.log('User with web3 ethereum authenticated')
      // The user accepted the app, now it's authenticated
      await this.loadUserDataFromWeb3(web3Instance)
    } catch (error) {
      // The user denied the app, it's not authenticated
      logger.log('User with ethereum denied the access')
      this.setErrorState(failReasons.NO_PERMISSIONS)
      throw new Error(texts.NO_PERMISSIONS)
    }
  }

  setErrorState(errorReason, web3Instance = null) {
    switch (errorReason) {
      case failReasons.NO_ADDRESS: {
        logger.log('User address not found')
        this.setState({
          web3: web3Instance,
          userData: {
            authenticated: false,
            reason: failReasons.NO_ADDRESS,
          },
          render: true,
          requestingAuth: false,
          displayMsg: texts.NO_ADDRESS,
          error: true,
        })
        break
      }
      case failReasons.NO_PERMISSIONS: {
        this.setState({
          web3: web3Instance,
          userData: {
            authenticated: false,
            reason: failReasons.NO_PERMISSIONS,
          },
          render: true,
          requestingAuth: false,
          displayMsg: texts.NO_PERMISSIONS,
          error: true,
        })
        break
      }
      case failReasons.NO_WEB3: {
        this.setState({
          render: true,
          userData: {
            authenticated: false,
            reason: failReasons.NO_WEB3,
          },
          requestingAuth: false,
          displayMsg: texts.NO_WEB3,
          error: true,
        })
        break
      }
      default: {
        this.setState({
          render: true,
          userData: {
            authenticated: false,
            reason: failReasons.NO_REASON,
          },
          requestingAuth: false,
          displayMsg: texts.DEFAULT_ERROR,
          error: true,
        })
        break
      }
    }
  }

  loadUserDataFromWeb3 = async web3Instance => {
    logger.log('Loading user data from web3')
    let userAddress
    let userNetwork

    const [ethAccounts, networkId] = await Promise.all([web3Instance.eth.getAccounts(), web3Instance.eth.net.getId()])
    userAddress = ethAccounts
    userNetwork = networkId
    logger.log('User address', userAddress)
    logger.log('User network ', userNetwork)

    // Once we got the user data, we check if he has an address, otherwise we should throw an error
    if (userAddress.length === 0) {
      this.setErrorState(failReasons.NO_ADDRESS, web3Instance)
      return
    }

    let balance = await web3Instance.eth.getBalance(userAddress[0])
    // Convert balance to eth
    balance = web3Instance.utils.fromWei(balance, 'ether')
    this.setState({
      web3: web3Instance,
      userData: {
        authenticated: true,
        address: this.toChecksumAddress(web3Instance, userAddress[0]),
        currentNetwork: userNetwork,
        ethBalance: balance,
      },
      render: true,
      requestingAuth: false,
    })

    // We subscribe to the event that detects if the user has changed the account
    window.ethereum.on('accountsChanged', accounts => {
      window.location.reload()
    })
    // We subscribe to the event that detects if the user has changed the network
    window.ethereum.on('networkChanged', network => {
      return this.networkChangedCallBack(web3Instance, network, balance)
    })
  }

  accountChangedCallback = (web3Instance, accounts) => {
    logger.log('Account Changed ', accounts)
    this.getUserBalance(web3Instance, accounts[0]).then(balance => {
      balance = web3Instance.utils.fromWei(balance, 'ether')
      this.setState({
        userData: {
          ...this.state.userData,
          address: this.toChecksumAddress(web3Instance, accounts[0]),
          ethBalance: balance,
        },
      })
    })
  }

  networkChangedCallBack = (web3Instance, network, balance) => {
    logger.log('Network changed ', network)
    balance = web3Instance.utils.fromWei(balance, 'ether')
    this.setState({
      userData: {
        ...this.state.userData,
        currentNetwork: network,
        ethBalance: balance,
      },
    })
  }

  getUserBalance = async (web3Instance, address) => {
    let balance = 0
    if (web3Instance && address) {
      balance = await web3Instance.eth.getBalance(address)
    }
    return balance
  }

  async componentDidMount() {
    logger.log('Fire event componentDidMount')
  }

  // Converts the address from uppercase to lowercase (checksum format) in order to avoid metamask bug of using both address
  toChecksumAddress = (web3, address) => {
    if (!web3 || !address || !web3.utils) {
      return
    }
    return web3.utils.toChecksumAddress(address)
  }

  render() {
    let content = <FullLoading show={true} dismissLink={{ to: '/', text: 'Go back' }} message={this.state.displayMsg} />
    if (!this.state.requestingAuth) {
      content = (
        <Web3Context.Provider
          value={{
            web3: this.state.web3,
            connectWeb3: this.loadWeb3,
            authenticated: this.state.userData.authenticated,
            userData: this.state.userData,
            displayMsg: this.state.displayMsg,
            error: this.state.error,
          }}
        >
          {this.props.children}
        </Web3Context.Provider>
      )
    }
    return content
  }
}

export default Web3Provider
