import React from 'react'
import styled from 'styled-components'
import IconEmail from './icons/IconEmail'
import IconTelegram from './icons/IconTelegram'
import IconRanking from './icons/IconRanking'
import { withRouter } from 'react-router-dom'

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
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  color: #fff;
`

const MainMenu = props => {
  const { userData, isOpen, ...restProps } = props
  const isUserValid = userData && userData.address

  const openTelegramLink = () => {
    if (!userData && userData.address) return

    window.open(`${process.env.REACT_APP_LIVEPEER_TELEGRAM_BOT_URL}?start=${userData.address}`, '_blank')
  }

  const goToSubscribe = () => {
    props.history.push('/account/subscription')
  }

  const menuItems = [
    {
      active: isUserValid,
      color: 'tertiary',
      icon: <IconTelegram />,
      onClick: openTelegramLink,
      text: 'Telegram',
    },
    {
      active: isUserValid,
      color: 'primary',
      icon: <IconEmail />,
      onClick: goToSubscribe,
      text: userData.isSubscribed ? 'Subscription' : 'Subscribe',
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

const MainMenuContainer = withRouter(MainMenu)

export default MainMenuContainer
