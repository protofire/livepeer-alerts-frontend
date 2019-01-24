import React from 'react'
import Card from '../../../../Common/UI/Card/Card.js'
import Tooltip from '@material-ui/core/Tooltip'
import * as toolTipsTexts from './ToolTipTexts'

const Status = props => {
  const { summary } = props
  const { totalStakeInLPT, active, status } = summary
  const tableData = [
    {
      title: 'Total Stake',
      currency: '(LPT)',
      data: totalStakeInLPT,
      tooltip: toolTipsTexts.TOTAL_STAKE_TOOLTIP
    },
    {
      title: 'Active',
      currency: '',
      data: active ? 'Yes' : 'No',
      tooltip: toolTipsTexts.ACTIVE_TRANSCODER_TOOLTIP
    }
  ]
  const toolTips = {
    REGISTERED: toolTipsTexts.REGISTERED_TOOLTIP,
    NOTREGISTERED: toolTipsTexts.NOT_REGISTERED_TOOLTIP
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
