import React from 'react'
import styled from 'styled-components'

const MainScrollStyled = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 30px;
  position: relative;
  z-index: 5;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    padding-left: ${props => props.theme.paddings.mainPadding};
    padding-right: ${props => props.theme.paddings.mainPadding};
    padding-top: 50px;
  }
`

const MainScroll = props => {
  const { children, ...restProps } = props

  return <MainScrollStyled {...restProps}>{children}</MainScrollStyled>
}

export default MainScroll
