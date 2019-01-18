import React from 'react'
import Card from '../../../Common/UI/Card/Card.js'

const Status = props => {
  const { summary } = props
  const { stake, fees, status } = summary
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

  const statusUppercase = status.toUpperCase()

  return (
    <>
      <Card className={`${classes.cardItem} ${classes.alignFlexEnd}`}>
        <div className={classes.topInfo}>
          <h3
            className={`${classes.walletTitle} ${classes.rewardTitleBig} ${
              classes.lessMarginBottom
            }`}
          >
            {statusUppercase}
          </h3>
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
