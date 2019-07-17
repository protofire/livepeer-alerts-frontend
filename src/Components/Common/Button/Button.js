import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const ButtonStyled = styled.button`
  background-color: ${props => props.theme.colors[props.type]};
  border-radius: ${props => props.theme.buttons.borderRadius};
  border: none;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
  color: ${props => props.theme.buttons.color};
  cursor: pointer;
  display: block;
  font-size: ${props => props.theme.buttons.fontSize};
  font-weight: ${props => props.theme.buttons.fontWeight};
  height: ${props => props.theme.buttons.height};
  margin: 0;
  outline: none;
  padding: 0 20px;
  text-transform: uppercase;

  &:hover,
  &:active {
    background-color: ${props => darken(0.1, props.theme.colors[props.type])};
  }

  &[disabled] {
    &,
    &:hover {
      background-color: ${props => props.theme.colors[props.type]};
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`

const Button = props => {
  const { disabled = false, onClick, children, type = 'primary', ...restProps } = props
  return (
    <ButtonStyled disabled={disabled} onClick={onClick} type={type} {...restProps}>
      {children}
    </ButtonStyled>
  )
}

export default Button
