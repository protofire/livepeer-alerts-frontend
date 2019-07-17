import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { rgba } from 'polished'
import Spinner from '../Spinner/Spinner'

const FullLoadingStyled = styled.div`
  align-items: center;
  background-color: ${props => rgba(props.theme.colors.primary, 0.75)};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 12345;
`

const Message = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0 auto 25px;
  max-width: 480px;
  padding: 0 ${props => props.theme.paddings.mainPadding};
  text-align: center;
`

const FullLoading = props => {
  const { message = 'Loading...', show = false, ...restProps } = props
  return show
    ? ReactDOM.createPortal(
        <FullLoadingStyled {...restProps}>
          {message ? <Message>{message}</Message> : null}
          <Spinner />
        </FullLoadingStyled>,
        document.getElementById('loadingContainer'),
      )
    : null
}

export default FullLoading
