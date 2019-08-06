import React from 'react'
import styled, { css } from 'styled-components'

const aCSS = css`
  color: #fff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`
const Title = styled.h2`
  margin-top: 25px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.pageTitle.color};
  text-shadow: ${props => props.theme.pageTitle.textShadow};
  position: relative;
  text-align: center;
  a {
    ${aCSS}
  }
`

const RewardSubscribeText = props => {
  const { summary } = props
  const { status } = summary
  let statusCheck = status.toUpperCase()
  let disableOrHide = !['REGISTERED', 'BONDED', 'UNBONDING', 'UNBONDED'].includes(statusCheck)
  return disableOrHide ? null : (
    <Title>
      {' '}
      Don't miss your{' '}
      <a
        href="https://forum.livepeer.org/t/why-you-should-bond-your-new-livepeer-tokens-lpt-detailed-version/418"
        target="_blank"
        rel="noopener noreferrer"
      >
        LPT rewards.
      </a>{' '}
      Get pro-active alert notifications
    </Title>
  )
}

export default RewardSubscribeText
