import React from 'react'
import Card from '../Common/Card'
import IconUp from './img/IconUp'
import IconActive from './img/IconActive'
import IconInactive from './img/IconInactive'
import StrippedList, { TR, TD } from '../Common/StrippedList'
import styled from 'styled-components'

const Status = styled.h3`
  align-items: center;
  color: ${props => props.theme.colors.lightText};
  display: flex;
  font-size: 10px;
  font-weight: 500;
  justify-content: center;
  line-height: 1.3;
  margin: 0 0 15px;
  text-align: center;
  text-transform: uppercase;

  > svg {
    margin: 0 5px 0 0;
  }
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

const TranscoderInfo = props => {
  const { ...restProps } = props
  const isActive = true
  const transcoderData = {
    address: '0x12345678…9abcdef',
    data: [
      {
        title: 'Your Participation In Stake',
        data: '0.50%',
      },
      {
        title: 'Position in Ranking',
        data: (
          <>
            <IconUp /> #12
          </>
        ),
      },
      {
        title: 'Reward Cut',
        data: '5%',
      },
      {
        title: 'Missed Reward Calls',
        data: '2/5000',
      },
      {
        title: 'Return Compared To #1',
        data: '0.75 (-14%)',
      },
    ],
  }

  return (
    <Card title={transcoderData.address} titleAlign="center" {...restProps}>
      <Status>
        {isActive ? (
          <>
            <IconActive /> Active
          </>
        ) : (
          <>
            <IconInactive /> Inactive
          </>
        )}
      </Status>
      <StrippedListStyled>
        {transcoderData.data.map((item, index) => {
          return (
            <TR key={index}>
              <TDTitle>{item.title}</TDTitle>
              <TDData>{item.data}</TDData>
            </TR>
          )
        })}
      </StrippedListStyled>
    </Card>
  )
}

export default TranscoderInfo
