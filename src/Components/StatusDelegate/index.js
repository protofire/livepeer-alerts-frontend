import React from 'react'
import * as toolTipsTexts from '../../Texts/ToolTipTexts'
import Card from '../Common/Card'
import KeyValue from '../Common/KeyValue'
import styled from 'styled-components'

const Title = styled.h3`
  color: ${props => props.theme.cards.titleColor};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 22px;
  padding: 10px 0 0 0;
  text-align: center;
`

const KeyValueStyled = styled(KeyValue)`
  margin-top: auto;
`

const StatusDelegate = props => {
  const { summary } = props
  const { totalStakeInLPT, active, status } = summary
  const tableData = [
    {
      data: totalStakeInLPT,
      text: 'LPT Total Stake',
      tooltip: toolTipsTexts.TOTAL_STAKE_TOOLTIP,
    },
    {
      data: active ? 'Yes' : 'No',
      text: 'Active',
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
    <Card title="Status">
      {/* <Tooltip title={statusToolTip}> */}
      <Title>{statusUppercase}</Title>
      {/* </Tooltip> */}
      <KeyValueStyled items={tableData} />
      {/* <div>
          {tableData.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.data}</p> */}
      {/* <Tooltip title={item.tooltip}>
                  <h4>
                    {item.title} {item.currency}
                  </h4>
                </Tooltip> */}
      {/* </div>
            )
          })}
        </div>
      </div> */}
    </Card>
  )
}

export default StatusDelegate
