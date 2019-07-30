import React from 'react'
import * as toolTipsTexts from '../../Texts/ToolTipTexts'
import Card from '../Common/Card'
import KeyValue from '../Common/KeyValue'
import styled from 'styled-components'
import Tooltip from '../Common/Tooltip'
import SmallLoadingCard from '../Common/SmallLoadingCard'

const Title = styled.h3`
  align-items: center;
  color: ${props => props.theme.cards.titleColor};
  display: flex;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  line-height: 1.2;
  margin: 0 0 22px;
  padding: 10px 0 0 0;
  text-align: center;
  white-space: nowrap;
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

  let content = summary.loadingSummary ? (
    <SmallLoadingCard show={true} message={'Loading user status...'} />
  ) : (
    <Card title="Status">
      <Title>
        {statusUppercase} <Tooltip description={statusToolTip} />
      </Title>
      <KeyValueStyled items={tableData} />
    </Card>
  )
  return content
}

export default StatusDelegate
