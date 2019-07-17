import React from 'react'
import * as toolTipsTexts from './ToolTipTexts'

const StatusDelegator = props => {
  const { summary } = props
  const { totalStakeInLPT, fees, status } = summary
  const tableData = [
    {
      title: 'Staked',
      currency: '(LPT)',
      data: totalStakeInLPT,
      tooltip: toolTipsTexts.TOTAL_STAKE_TOOLTIP,
    },
    {
      title: 'Earning fees',
      currency: '(ETH)',
      data: fees,
      tooltip: toolTipsTexts.EARNING_FEES_TOOLTIP,
    },
  ]
  const toolTips = {
    BONDED: toolTipsTexts.BONDED_STATUS_TOOLTIP,
    UNBONDED: toolTipsTexts.UNBONDED_STATUS_TOOLTIP,
    UNBONDING: toolTipsTexts.UNBONDING_STATUS_TOOLTIP,
    PENDING: toolTipsTexts.PENDING_STATUS_TOOLTIP,
  }

  const statusUppercase = status.toUpperCase()
  const statusToolTip = toolTips[statusUppercase]

  return (
    <>
      <div>
        {/* <Tooltip title={statusToolTip}>
          <h3>
            {statusUppercase}
          </h3>
        </Tooltip> */}
      </div>
      <div>
        {tableData.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.data}</p>
              {/* <Tooltip title={item.tooltip}>
                <h4>
                  {item.title} {item.currency}
                </h4>
              </Tooltip> */}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default StatusDelegator
