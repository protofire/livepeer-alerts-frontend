import React from 'react'
import styled from 'styled-components'

const CardStyled = styled.div`
  border-radius: ${props => props.theme.cards.borderRadius};
  box-shadow: ${props => props.theme.cards.boxShadow};
  background-color: ${props => props.theme.cards.backgroundColor};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.cards.paddingVertical} ${props => props.theme.cards.paddingHorizontal};
`

const Title = styled.h2`
  color: ${props => props.theme.cards.titleColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.31;
  margin: 0;
  text-align: ${props => props.titleAlign};
`

const Body = styled.div`
  color: ${props => props.theme.cards.textColor};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: ${props => props.bodyAlign};
`

const Card = props => {
  const { title, children, titleAlign = 'left', bodyAlign, tooltip, ...restProps } = props
  return (
    <CardStyled {...restProps}>
      {title ? (
        <Title title={tooltip ? tooltip : ''} titleAlign={titleAlign}>
          {title}
        </Title>
      ) : null}
      <Body bodyAlign={bodyAlign}>{children}</Body>
    </CardStyled>
  )
}

export default Card
