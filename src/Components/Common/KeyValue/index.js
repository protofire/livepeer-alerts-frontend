import React from 'react'
import styled from 'styled-components'

const KeyValueStyled = styled.div`
  border-top: 1px solid ${props => props.theme.colors.borderColor};
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Item = styled.div`
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.borderColor};
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: center;
  padding: 10px 5px 0;

  &:last-child {
    border-right: none;
  }
`

const Value = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
  margin: 0;
  text-align: center;
`

const Title = styled.h3`
  color: ${props => props.theme.colors.darkGray};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.38;
  margin: 0;
  text-align: center;
`

const KeyValue = props => {
  const { items, ...restProps } = props
  return (
    <KeyValueStyled {...restProps}>
      {items.map((item, index) => {
        return (
          <Item key={index}>
            <Value>{item.data}</Value>
            <Title>{item.text}</Title>
          </Item>
        )
      })}
    </KeyValueStyled>
  )
}

export default KeyValue
