import React from 'react'
import * as toolTipsTexts from '../../Texts/ToolTipTexts'
import Card from '../Common/Card'
import KeyValue from '../Common/KeyValue'
import styled from 'styled-components'
import Tooltip from '../Common/Tooltip'
import SmallLoadingCard from '../Common/SmallLoadingCard'
import { toFixedDecimals } from '../../Utils'

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

const StatusDelegator = props => {
  const { summary, web3 } = props
  const { totalStakeInLPT, fees, status } = summary
  let feesInETH = 0
  // Formats fees from wei to ETH
  if (fees) {
    feesInETH = web3.utils.fromWei(fees.toString(), 'ether')
  }

  const tableData = [
    {
      data: totalStakeInLPT,
      text: 'LPT Staked',
      tooltip: toolTipsTexts.TOTAL_STAKE_TOOLTIP,
    },
    {
      data: toFixedDecimals(feesInETH, 2),
      text: 'ETH Earning fees',
      tooltip: toolTipsTexts.EARNING_FEES_TOOLTIP,
      tooltipDataText: feesInETH,
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
  let content = summary.loadingSummary ? (
    <SmallLoadingCard show={true} message={'Loading user status...'} />
  ) : (
    <Card title="Your Status">
      <Title>
        {statusUppercase} <Tooltip description={statusToolTip} />
      </Title>
      <KeyValueStyled items={tableData} />
    </Card>
  )

  return content
}

export default StatusDelegator
