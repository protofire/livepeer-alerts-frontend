import React from 'react'
import { truncateStringInTheMiddle } from '../../../../utils'
import metamaskImage from '../../../../assets/img/logos/metamask.svg'
import Card from '../../../Common/UI/Card/Card.js'

const Wallet = props => {
  const { classes, userData, lpBalance } = props
  const { address, ethBalance } = userData

  const tableData = [
    {
      currency: 'LPT',
      data: lpBalance
    },
    {
      currency: 'ETH',
      data: ethBalance
    }
  ]

  return (
    <Card className={classes.cardItem}>
      <div className={classes.logoMetamask}>
        <img src={metamaskImage} className={classes.logoMetamaskImg} alt="" />
      </div>
      <h3 title={address} className={classes.walletTitle}>
        {truncateStringInTheMiddle(address)}
      </h3>
      <div className={`${classes.blockData}`}>
        {tableData.map((item, index) => {
          return (
            <div className={`${classes.blockDataItem}`} key={index}>
              <p className={`${classes.blockDataItemValue}`}>{item.data}</p>
              <h4 className={`${classes.blockDataItemTitle}`}>{item.currency}</h4>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default Wallet
