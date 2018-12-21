import Web3 from 'web3'

let web3;

/** We check if metamask is installed **/
if (typeof web3 !== 'undefined') {
  /** We get the provider of web3 injected by metamask **/
  web3 = new Web3(web3.currentProvider)
}

export default web3
