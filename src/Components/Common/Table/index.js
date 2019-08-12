import React from 'react'
import styled, { css } from 'styled-components'

const TableWrapper = styled.table`
  width: 100%;
`
const TableOverflow = styled.div`
  max-width: 100%;
  overflow-x: auto;
  width: 100%;
`

export const TR = styled.tr``
export const TBody = styled.tbody``
export const THead = styled.thead``

const CellStyle = css`
  border-bottom: 1px solid ${props => props.theme.borders.borderColor};
  padding-left: 5px;
  padding-right: 5px;
  text-align: left;
  white-space: nowrap;

  &:first-child {
    padding-left: ${props => props.theme.cards.paddingHorizontal};
  }

  &:last-child {
    padding-right: ${props => props.theme.cards.paddingHorizontal};
  }
`

export const TH = styled.th`
  ${CellStyle}
  color: ${props => props.theme.colors.textColorLight};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  padding-bottom: 18px;
  padding-top: 18px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
`

export const TD = styled.td`
  ${CellStyle}
  color: ${props => props.theme.colors.textColor};
  font-size: 13px;
  font-weight: normal;
  line-height: 1.2;
  padding-bottom: 13px;
  padding-top: 13px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};

  a {
    color: ${props => props.theme.colors.textColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`

const Table = props => {
  const { children, tableHead, ...restProps } = props

  return (
    <TableOverflow {...restProps}>
      <TableWrapper>
        {tableHead ? <THead>{tableHead}</THead> : null}
        <TBody>{children}</TBody>
      </TableWrapper>
    </TableOverflow>
  )
}

export default Table
