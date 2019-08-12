import React from 'react'
import styled, { css } from 'styled-components'
import IconChevronLeft from './img/IconChevronLeft'
import IconChevronRight from './img/IconChevronRight'

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${props => props.theme.cards.paddingVertical};
  padding-left: ${props => props.theme.cards.paddingHorizontal};
  padding-right: ${props => props.theme.cards.paddingHorizontal};
  padding-top: ${props => props.theme.cards.paddingVertical};
`

const Button = styled.button`
  align-items: center;
  background: none;
  border: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  padding: 0 10px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const EndItems = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
`

const paginationText = css`
  color: #666;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.2;
`

const RowsPerPage = styled.div`
  align-items: center;
  display: flex;
`

const Text = styled.span`
  ${paginationText}
  margin-right: 10px;

  &:last-child {
    margin: 0;
  }
`

const Amount = styled.span`
  margin-left: 40px;
  margin-right: 40px;
`

const Select = styled.select`
  ${paginationText}
  background: transparent;
  border: none;
`

const Pagination = props => {
  const { children, ...restProps } = props

  return (
    <PaginationWrapper {...restProps}>
      {children}
      <EndItems>
        <RowsPerPage>
          <Text>Rows per page:</Text>
          <Select>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </Select>
          <Amount>
            <Text>1 - 10 of 5000</Text>
          </Amount>
          <Button>
            <IconChevronLeft />
          </Button>
          <Button>
            <IconChevronRight />
          </Button>
        </RowsPerPage>
      </EndItems>
    </PaginationWrapper>
  )
}

export default Pagination
