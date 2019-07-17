import React from 'react'
import styled from 'styled-components'

const CardStyled = styled.div`
  border-radius: ${props => props.theme.cards.borderRadius};
  box-shadow: ${props => props.theme.cards.boxShadow};
  background-color: ${props => props.theme.cards.backgroundColor};
  padding: ${props => props.theme.cards.paddingVertical} ${props => props.theme.cards.paddingHorizontal};
`

const Title = styled.h2`
  color: ${props => props.theme.cards.titleColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.31;
  margin: 0;
  text-align: left;
`

const Body = styled.div``

const Card = props => {
  const { title, children, ...restProps } = props
  return (
    <CardStyled {...restProps}>
      {title ? <Title>{title}</Title> : null}
      <Body>{children}</Body>
    </CardStyled>
  )
}

export default Card
