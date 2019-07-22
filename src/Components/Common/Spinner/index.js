import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};

  > svg {
    animation: ${rotate} 1.5s linear infinite;
    height: ${props => props.height};
    width: ${props => props.width};

    circle {
      stroke: ${props => props.color};
    }

    path {
      stroke: ${props => props.color};
    }
  }
`
const SpinnerIcon = () => {
  return (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12" strokeOpacity="0.2" strokeWidth="2" />
      <path
        d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Spinner = props => {
  const { width = '40px', height = '40px', color = '#fff', ...restProps } = props

  return (
    <SpinnerContainer width={width} height={height} color={color} {...restProps}>
      <SpinnerIcon />
    </SpinnerContainer>
  )
}

export default Spinner
