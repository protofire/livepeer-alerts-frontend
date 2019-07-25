import React from 'react'
import Card from '../Common/Card'
import StrippedList, { TR, TD, TH } from '../Common/StrippedList'
import styled from 'styled-components'

const Description = styled.h3`
  color: ${props => props.theme.colors.lightText};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 15px;
`

const StrippedListStyled = styled(StrippedList)`
  margin-top: auto;
`

const TDTitle = styled(TD)`
  font-weight: 500;
`

const TDData = styled(TD)`
  text-align: right;
`

const THData = styled(TH)`
  text-align: right;
`

const EarnedRewards = props => {
  const { ...restProps } = props
  const earnedData = [
    {
      round: 'Next',
      lpt: '1000',
      cut: '10.00',
    },
    {
      round: 'Last',
      lpt: '500',
      cut: '9.50',
    },
    {
      round: 'Last 7',
      lpt: '8961',
      cut: '7.25',
    },
    {
      round: 'Last 30',
      lpt: '50000',
      cut: '30.00',
    },
  ]

  const tableHead = (
    <TR>
      <TH>Round</TH>
      <THData>LPT</THData>
      <THData>Your Cut</THData>
    </TR>
  )

  return (
    <Card title="Earned Rewards" {...restProps}>
      <Description>Newly minted LPT claimed.</Description>
      <StrippedListStyled tableHead={tableHead}>
        {earnedData.map((item, index) => {
          return (
            <TR key={index}>
              <TDTitle>{item.round}</TDTitle>
              <TDData>{item.lpt}</TDData>
              <TDData>{item.cut}</TDData>
            </TR>
          )
        })}
      </StrippedListStyled>
    </Card>
  )
}

export default EarnedRewards
