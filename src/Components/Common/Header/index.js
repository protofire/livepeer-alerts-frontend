import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import MainMenu from '../MainMenu'
import MenuButton from '../MenuButton'

const HeaderStyled = styled.div`
  background-color: ${props => props.theme.header.backgroundColor};
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 5;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    height: ${props => props.theme.header.height};
  }
`

const HeaderInner = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100%;
  padding: ${props => props.theme.paddings.mainPadding} 0;
  width: ${props => props.theme.themeBreakPoints.xxl};

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${props => props.theme.paddings.mainPadding};
  }
`

const LogoStyled = styled(Logo)`
  margin-left: ${props => props.theme.paddings.mainPadding};

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    margin: 0;
  }
`

const MenuButtonStyled = styled(MenuButton)`
  position: absolute;
  right: 10px;
  top: 10px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    display: none;
  }
`

const MainMenuStyled = styled(MainMenu)`
  margin-bottom: -${props => props.theme.paddings.mainPadding};
  margin-top: 20px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    margin-bottom: 0;
    margin-top: 0;
  }
`

class Header extends Component {
  state = {
    menuOpen: false,
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render = () => {
    const { ...restProps } = this.props

    return (
      <HeaderStyled {...restProps}>
        <HeaderInner>
          <LogoStyled />
          <MenuButtonStyled onClick={this.toggleMenu} />
          <MainMenuStyled isOpen={this.state.menuOpen} {...this.props} />
        </HeaderInner>
      </HeaderStyled>
    )
  }
}

export default Header
