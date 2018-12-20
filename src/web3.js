import Web3 from 'web3'

let web3

/** We check if metamask is installed **/
if (window.web3) {
  /** We get the provider of web3 injected by metamask **/
  web3 = new Web3(window.web3.currentProvider)
} else {
  /** The user is not running metamask, we should send a message **/
  /** TODO **/
}

export default web3
