import React from 'react'
import { truncateStringInTheMiddle } from '../../../../utils'
import Card from '../../../Common/UI/Card/Card.js'

const Status = props => {
  const { summary } = props
  const { stake, fees, status, delegateAddress, startRound } = summary
  const tableData = [
    {
      title: 'Stake',
      currency: 'LPT',
      data: stake
    },
    {
      title: 'Earning fees',
      currency: 'ETH',
      data: fees
    }
  ]
  const { classes } = props

  const messageForBonded = () => {
    if (status !== 'Bonded') {
      return
    }

    const delegateAddressUrl = `https://explorer.livepeer.org/accounts/${delegateAddress}`

    return (
      <>
        <p className={classes.walletInfo}>
          Bonded to delegate{' '}
          <a href={delegateAddressUrl} target="_blank" rel="noopener noreferrer">
            {truncateStringInTheMiddle(delegateAddress)}
          </a>{' '}
          at round {startRound}{' '}
        </p>
      </>
    )
  }

  return (
    <>
      <Card className={`${classes.cardItem} ${classes.alignFlexEnd}`}>
        <div className={classes.topInfo}>
          <h3
            className={`${classes.walletTitle} ${classes.rewardTitleBig} ${
              classes.lessMarginBottom
            }`}
          >
            {status}
          </h3>
          {messageForBonded()}
        </div>
        <div className={`${classes.blockData}`}>
          {tableData.map((item, index) => {
            return (
              <div className={`${classes.blockDataItem}`} key={index}>
                <p className={`${classes.blockDataItemValue}`}>{item.data}</p>
                <h4 className={`${classes.blockDataItemTitle}`}>
                  {item.title} {item.currency}
                </h4>
              </div>
            )
          })}
        </div>
      </Card>
    </>
  )
}

export default Status
