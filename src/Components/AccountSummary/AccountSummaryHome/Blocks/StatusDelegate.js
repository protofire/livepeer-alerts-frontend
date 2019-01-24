import React from 'react'
import Card from '../../../Common/UI/Card/Card.js'
import Tooltip from '@material-ui/core/Tooltip'

const Status = props => {
  const { summary } = props
  const { totalStakeInLPT, rewardCut, status } = summary
  const tableData = [
    {
      title: 'Staked',
      currency: '(LPT)',
      data: totalStakeInLPT,
      tooltip: 'total tokens delegated toward a delegator '
    },
    {
      title: 'Reward Cut',
      currency: '(%)',
      data: rewardCut,
      tooltip: 'of block reward cut paid to delegate by a delegator'
    }
  ]
  const toolTips = {
    REGISTERED: 'You are registered as delegate on livepeer network.',
    NOTREGISTERED: 'You are not registered as delegate on livepeer network.'
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
