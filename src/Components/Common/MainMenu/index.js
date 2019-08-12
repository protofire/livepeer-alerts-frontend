import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import IconRanking from './icons/IconRanking'

const MainMenuStyled = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: auto;
  }
`

const Item = styled.div`
  align-items: center;
  border-color: ${props => props.theme.colors[props.borderColor]};
  border-top-style: solid;
  border-top-width: 4px;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  min-height: ${props => props.theme.header.height};
  padding: 0 10px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    min-height: 0;
  }

  &:hover,
  &:active {
    opacity: 0.8;
  }

  > svg {
    margin-right: 12px;
  }
`

const ItemText = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
`

const MainMenu = props => {
  const { userData, isOpen, ...restProps } = props

  const menuItems = [
    {
      active: true,
      color: 'secondary',
      icon: <IconRanking />,
      onClick: () => {
        props.history.push('/roi-ranking')
      },
      text: 'ROI Ranking',
    },
  ]

  return (
    <MainMenuStyled isOpen={isOpen} {...restProps}>
      {menuItems.map((item, index) => {
        return item.active ? (
          <Item onClick={item.onClick} key={index} borderColor={item.color}>
            {item.icon} <ItemText>{item.text}</ItemText>
          </Item>
        ) : null
      })}
    </MainMenuStyled>
  )
}

export default withRouter(MainMenu)
