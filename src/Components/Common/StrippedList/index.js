import React from 'react'
import styled, { css } from 'styled-components'

const StrippedListStyled = styled.table``

export const TR = styled.tr`
  color: #000;
  font-size: 12px;
  line-height: 1.33;

  &:nth-child(odd) > td {
    background-color: #f5f5f5;
  }
`

export const TBody = styled.tbody``

export const THead = styled.thead``

const CellStyle = css`
  padding: 4px 3px;
  text-align: left;
  white-space: nowrap;

  &:first-child {
    padding-left: 6px;
  }

  &:last-child {
    padding-right: 6px;
  }
`

export const TH = styled.th`
  ${CellStyle}

  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  font-weight: 700;
`
export const TD = styled.td`
  ${CellStyle}

  &:first-child {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }

  &:last-child {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }
`

const StrippedList = props => {
  const { children, tableHead, ...restProps } = props

  return (
    <StrippedListStyled {...restProps}>
      {tableHead ? <THead>{tableHead}</THead> : null}
      <TBody>{children}</TBody>
    </StrippedListStyled>
  )
}

export default StrippedList
