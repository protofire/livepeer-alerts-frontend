import React from 'react'
import { truncateStringInTheMiddle, decimalPlaces } from '../../../utils'
import metamaskImage from '../../../assets/img/logos/metamask.svg'

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
    <div>
      <div>
        <img src={metamaskImage} alt="" />
      </div>
      <h3 title={address}>{truncateStringInTheMiddle(address)}</h3>
      <div>
        {tableData.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.data}</p>
              <h4>{item.currency}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wallet
