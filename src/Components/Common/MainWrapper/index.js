import React from 'react'
import styled from 'styled-components'
import bgImage from './img/main-background.jpg'

const MainWrapperStyled = styled.div`
  background-color: #fff;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  width: 100vw;

  &::before {
    background-color: rgba(0, 0, 0, 0.4);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
`

const MainWrapper = props => {
  const { children, ...restProps } = props

  return <MainWrapperStyled {...restProps}>{children}</MainWrapperStyled>
}

export default MainWrapper
