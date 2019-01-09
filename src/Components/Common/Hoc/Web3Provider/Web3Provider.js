import React, { Component } from 'react'
import Web3 from 'web3'
import * as failReasons from './Web3FailReasons'
import * as texts from '../../UI/Texts/Texts'
import Spinner from '../../UI/Spinner/Spinner'
import logger from '../../../../utils'

const defaultState = {
  userData: 1,
  authenticated: 2,
  web3: 3,
  displayMsg: '',
  error: false
}

const Web3Context = React.createContext(defaultState)

export const Web3ContextConsumer = Web3Context.Consumer

class Web3Provider extends Component {
  state = {
    web3: null,
    userData: {
      authenticated: false,
      reason: null,
      address: null,
      currentNetwork: null
    },
    render: false,
    requestingAuth: true,
    displayMsg: texts.WAITING_AUTHORIZATION,
    error: false
  }

  loadWeb3 = async () => {
    logger.log('[Web3FunctionalProvider.js] loadWeb3')
    /** We check if metamask is installed, either the new version or the legacy one **/
    if (window.ethereum) {
      await this.loadWeb3LastVersion()
    } else if (window.web3) {
      await this.loadWeb3Legacy()
    } else {
      /** The user does not have web3 **/
      logger.log('[Web3FunctionalProvider.js] user does not have web3')
      this.setState({
        render: true,
        userData: {
          authenticated: false,
          reason: failReasons.NO_WEB3
        },
        requestingAuth: false,
        displayMsg: texts.NO_WEB3,
        error: true
      })
    }
  }

  loadWeb3Legacy = async () => {
    logger.log('[Web3FunctionalProvider.js] getting web3 legacy instance')
    let web3Instance
    web3Instance = new Web3(window.web3.currentProvider)
    await this.loadUserDataFromWeb3(web3Instance)
  }

  loadWeb3LastVersion = async () => {
    logger.log('[Web3FunctionalProvider.js] getting web3 new instance')
    let web3Instance
    web3Instance = new Web3(window.ethereum)
    try {
      /** Request access to the user **/
      logger.log('[Web3FunctionalProvider.js] requesting user permissions')
      let enabledAddress = await window.ethereum.enable()
      /** Could be deleted, this is done for make easier the test **/
      if (!enabledAddress) {
        throw new Error(failReasons.NO_PERMISSIONS)
      }
      logger.log('[Web3FunctionalProvider.js] user with web3 ethereum authenticated')
      /** The user accepted the app, now it's authenticated **/
      await this.loadUserDataFromWeb3(web3Instance)
    } catch (error) {
      /** The user denied the app, it's not authenticated **/
      logger.log('[Web3FunctionalProvider.js] user denied access')
      this.setState({
        web3: web3Instance,
        userData: {
          authenticated: false,
          reason: failReasons.NO_PERMISSIONS
        },
        render: true,
        requestingAuth: false,
        displayMsg: texts.NO_PERMISSIONS,
        error: true
      })
      logger.log('[Web3FunctionalProvider.js] user with ethereum denied the access')
    }
  }

  loadUserDataFromWeb3 = async web3Instance => {
    console.log('Loading user data from web3')
    let userAddress
    let userNetwork
    Promise.all([web3Instance.eth.getAccounts(), web3Instance.eth.net.getId()]).then(results => {
      userAddress = results[0]
      userNetwork = results[1]
      web3Instance.eth.getBalance(userAddress[0]).then(balance => {
        /** Convert balance to eth **/
        balance = web3Instance.utils.fromWei(balance, 'ether')
        this.setState({
          web3: web3Instance,
          userData: {
            authenticated: true,
            address: this.toChecksumAddress(web3Instance, userAddress[0]),
            currentNetwork: userNetwork,
            ethBalance: balance
          },
          render: true,
          requestingAuth: false
        })
        /** We subscribe to the event that detects if the user has changed the account **/
        window.ethereum.on('accountsChanged', accounts => {
          logger.log('ETHEREUM CHANGED')
          logger.log('ACCOUNTS ', accounts)
          this.setState({
            userData: {
              ...this.state.userData,
              address: this.toChecksumAddress(web3Instance, accounts[0])
            }
          })
        })
        /** We subscribe to the event that detects if the user has changed the network **/
        window.ethereum.on('networkChanged', network => {
          logger.log('NETWORK CHANGED')
          logger.log('NETWORK ', network)
          this.setState({
            userData: {
              ...this.state.userData,
              currentNetwork: network
            }
          })
        })
      })
    })
  }

  async componentDidMount() {
    logger.log('[Web3FunctionalProvider.js] componentDidMount')
    this.setState({ render: true })
    await this.loadWeb3()
  }

  /** Converts the address from uppercase to lowercase (checksum format) in order to avoid metamask bug of using both address **/
  toChecksumAddress = (web3, address) => {
    let checksumAddress = '0x'
    address = address.toLowerCase().replace('0x', '')

    // creates the case map using the binary form of the hash of the address
    let caseMap = parseInt(web3.utils.sha3('0x' + address), 16)
      .toString(2)
      .substring(0, 40)

    for (let i = 0; i < address.length; i++) {
      if (caseMap[i] === '1') {
        checksumAddress += address[i].toUpperCase()
      } else {
        checksumAddress += address[i]
      }
    }
    return checksumAddress
  }

  render() {
    let content = (
      <>
        <h3>{this.state.displayMsg}</h3>
        <Spinner />
      </>
    )
    if (!this.state.requestingAuth) {
      if (this.state.render && this.state.web3 && this.state.userData.authenticated) {
        content = (
          <Web3Context.Provider
            value={{
              web3: this.state.web3,
              authenticated: this.state.userData.authenticated,
              userData: this.state.userData
            }}
          >
            {this.props.children}
          </Web3Context.Provider>
        )
      } else {
        content = (
          <Web3Context.Provider
            value={{
              web3: this.state.web3,
              authenticated: this.state.userData.authenticated,
              userData: this.state.userData,
              displayMsg: this.state.displayMsg,
              error: this.state.error
            }}
          >
            {this.props.children}
          </Web3Context.Provider>
        )
      }
    }
    return content
  }
}

export default Web3Provider
