import React from 'react'
import Card from '../../../Common/UI/Card/Card.js'
import Tooltip from '@material-ui/core/Tooltip'

const Status = props => {
  const { summary } = props
  const { totalStakeInLPT, fees, status } = summary
  const tableData = [
    {
      title: 'Staked',
      currency: '(LPT)',
      data: totalStakeInLPT,
      tooltip: 'total tokens delegated toward a delegator '
    },
    {
      title: 'Earning fees',
      currency: '(ETH)',
      data: fees,
      tooltip: 'the amount of ETH the delegator has earned'
    }
  ]
  const toolTips = {
    BONDED:
      'A delegator enters the Bonded state at the start of startRound which is set after it bonds.',
    UNBONDED:
      'A delegator starts off in the Unbonded state by default and also enters the Unbonded state if it fully unbonds.',
    UNBONDING: 'A delegator enters the Unbonding state when it unbounds. ',
    PENDING:
      'A delegator enters the Pending state when it bonds from the Unbonded state. You have to wait the Unbonding Period before you can access your token.'
  }
  const { classes } = props

  const statusUppercase = status.toUpperCase()

  const statusToolTip = toolTips[statusUppercase]

  return (
    <>
      <Card className={`${classes.cardItem} ${classes.alignFlexEnd}`}>
        <div className={classes.topInfo}>
          <Tooltip title={statusToolTip}>
            <h3
              className={`${classes.walletTitle} ${classes.rewardTitleBig} ${
                classes.lessMarginBottom
              }`}
            >
              {statusUppercase}
            </h3>
          </Tooltip>
        </div>
        <div className={`${classes.blockData}`}>
          {tableData.map((item, index) => {
            return (
              <div className={`${classes.blockDataItem}`} key={index}>
                <p className={`${classes.blockDataItemValue}`}>{item.data}</p>
                <Tooltip title={item.tooltip}>
                  <h4 className={`${classes.blockDataItemTitle}`}>
                    {item.title} {item.currency}
                  </h4>
                </Tooltip>
              </div>
            )
          })}
        </div>
      </Card>
    </>
  )
}

export default Status
