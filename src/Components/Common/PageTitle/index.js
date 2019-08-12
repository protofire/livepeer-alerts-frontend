import React from 'react'
import styled from 'styled-components'

const PageTitleStyled = styled.h2`
  color: ${props => props.theme.pageTitle.color};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 20px;
  max-width: 100%;
  padding: 0 0 5px;
  position: relative;
  text-shadow: ${props => props.theme.pageTitle.textShadow};
  width: ${props => props.theme.themeBreakPoints.xxl};

  &::after {
    background-color: #fff;
    bottom: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }
`

const PageTitle = props => {
  const { children, ...restProps } = props

  return <PageTitleStyled {...restProps}>{children}</PageTitleStyled>
}

export default PageTitle
