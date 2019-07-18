import React from 'react'
import { truncateStringInTheMiddle, decimalPlaces } from '../../Utils'
import metamaskImage from './img/metamask.svg'
import Card from '../Common/Card'
import KeyValue from '../Common/KeyValue'
import styled from 'styled-components'

const walletIconDimensions = 60
const WalletIcon = styled.div`
  background-color: #fff;
  background-image: url(${metamaskImage});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: ${walletIconDimensions - 12}px ${walletIconDimensions - 12}px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  height: ${walletIconDimensions}px;
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -${walletIconDimensions / 2 + 10}px;
  width: ${walletIconDimensions}px;
`

const Title = styled.h2`
  color: ${props => props.theme.cards.titleColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 22px;
  text-align: center;
`

const KeyValueStyled = styled(KeyValue)`
  margin-top: auto;
`

const Wallet = props => {
  const { userData, lpBalance } = props
  const { address, ethBalance } = userData
  const tableData = [
    {
      currency: 'LPT',
      data: lpBalance,
    },
    {
      currency: 'ETH',
      data: decimalPlaces(ethBalance),
    },
  ]

  return (
    <Card>
      <WalletIcon />
      <Title title={address}>{truncateStringInTheMiddle(address)}</Title>
      <KeyValueStyled items={tableData} />
    </Card>
  )
}

export default Wallet
