import React from 'react'
import * as toolTipsTexts from './ToolTipTexts'

const Status = props => {
  const { summary } = props
  const { totalStakeInLPT, active, status } = summary
  const tableData = [
    {
      title: 'Total Stake',
      currency: '(LPT)',
      data: totalStakeInLPT,
      tooltip: toolTipsTexts.TOTAL_STAKE_TOOLTIP,
    },
    {
      title: 'Active',
      currency: '',
      data: active ? 'Yes' : 'No',
      tooltip: toolTipsTexts.ACTIVE_TRANSCODER_TOOLTIP,
    },
  ]
  const toolTips = {
    REGISTERED: toolTipsTexts.REGISTERED_TOOLTIP,
    NOTREGISTERED: toolTipsTexts.NOT_REGISTERED_TOOLTIP,
  }

  const statusUppercase = status.toUpperCase()

  const statusToolTip = toolTips[statusUppercase]

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default Status
