import React, { Component } from 'react'
import Web3 from 'web3'
import * as failReasons from './Web3FailReasons'
import * as texts from '../../UI/Texts/Texts'
import Spinner from '../../../AccountSummary/AccountSummary'

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
    displayMsg: texts.WAITING_AUTHORIZATION
  }

  loadWeb3 = async () => {
    //console.log('[Web3FunctionalProvider.js] loadWeb3')
    /** We check if metamask is installed, either the new version or the legacy one **/
    if (window.ethereum) {
      await this.loadWeb3LastVersion()
    } else if (window.web3) {
      await this.loadWeb3Legacy()
    } else {
      /** The user does not have web3 **/
      //console.log('[Web3FunctionalProvider.js] user does not have web3')
      this.setState({
        render: true,
        userData: {
          authenticated: false,
          reason: failReasons.NO_WEB3
        }
      })
    }
    /** Once the auth process is finished we allow the user to see the protected component **/
    this.setState({ requestingAuth: false })
  }

  loadWeb3Legacy = async () => {
    //console.log('[Web3FunctionalProvider.js] getting web3 legacy instance')
    let web3Instance
    web3Instance = new Web3(window.web3.currentProvider)
    await this.loadUserDataFromWeb3(web3Instance)
  }

  loadWeb3LastVersion = async () => {
    //console.log('[Web3FunctionalProvider.js] getting web3 new instance')
    let web3Instance
    web3Instance = new Web3(window.ethereum)
    try {
      /** Request access to the user **/
      //console.log('[Web3FunctionalProvider.js] requesting user permissions')
      await window.ethereum.enable()
      //console.log('[Web3FunctionalProvider.js] user with web3 ethereum authenticated')
      /** The user accepted the app, now it's authenticated **/
      await this.loadUserDataFromWeb3(web3Instance)
    } catch (error) {
      /** The user denied the app, it's not authenticated **/
      //console.log('[Web3FunctionalProvider.js] user denied access')
      this.setState({
        web3: web3Instance,
        userData: {
          authenticated: false,
          reason: failReasons.NO_PERMISSIONS
        },
        render: true
      })
      //console.log('[Web3FunctionalProvider.js] user with ethereum denied the access')
    }
  }

  loadUserDataFromWeb3 = async web3Instance => {
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
          render: true
        })

        /** We subscribe to the event that detects if the user has changed the account **/
        window.ethereum.on('accountsChanged', accounts => {
          console.log('ETHEREUM CHANGED')
          console.log('ACCOUNTS ', accounts)
          this.setState({
            userData: {
              ...this.state.userData,
              address: this.toChecksumAddress(web3Instance, accounts[0])
            }
          })
        })

        /** We subscribe to the event that detects if the user has changed the network **/
        window.ethereum.on('networkChanged', network => {
          console.log('NETWORK CHANGED')
          console.log('NETWORK ', network)
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
    console.log('[Web3FunctionalProvider.js] componentDidMount')
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
    /** Auth already requested **/
    if (!this.state.requestingAuth) {
      /** User Gave us permissions **/
      if (this.state.render && this.state.web3 && this.state.userData.authenticated) {
        /** FOR EVERY CHILDREN WE INJECT THE WEB3 **/
        const { children } = this.props
        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child, {
            userData: this.state.userData,
            web3: this.state.web3,
            authenticated: true
          })
        )
        return <div>{childrenWithProps}</div>
      }
    }

    /** TODO -- Redirect to / with error msg **/
    /*    if (this.state.render && (!this.state.web3 || !this.state.approvePermissions)) {
      return <Web3UnavailableScreen />
    }*/

    return null
  }
}

export default Web3Provider
