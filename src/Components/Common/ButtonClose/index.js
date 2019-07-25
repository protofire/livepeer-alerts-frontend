import React from 'react'
import IconClose from './img/IconClose'
import styled from 'styled-components'

const ButtonCloseStyled = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 0;
  outline: none;
  padding: 0;
  width: 40px;

  &[disabled] {
    &,
    &:hover {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`

const ButtonClose = props => {
  const { disabled = false, onClick, type, ...restProps } = props
  return (
    <ButtonCloseStyled disabled={disabled} onClick={onClick} type={type} {...restProps}>
      <IconClose />
    </ButtonCloseStyled>
  )
}

export default ButtonClose
