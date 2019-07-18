import React from 'react'
import styled from 'styled-components'

const MenuButtonStyled = styled.div`
  align-items: center;
  display: flex;
  height: 45px;
  justify-content: center;
  width: 45px;

  &:active {
    opacity: 0.5;
  }
`

const menuIcon = () => {
  return (
    <svg
      height="24.75px"
      version="1.1"
      viewBox="0 0 24.75 24.75"
      width="24.75px"
      x="0px"
      xmlns="http://www.w3.org/2000/svg"
      y="0px"
    >
      <path
        fill="#fff"
        d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
		c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
		c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
      />
    </svg>
  )
}

const MenuButton = props => {
  const { onClick, ...restProps } = props

  return (
    <MenuButtonStyled onClick={onClick} {...restProps}>
      {menuIcon()}
    </MenuButtonStyled>
  )
}

export default MenuButton
