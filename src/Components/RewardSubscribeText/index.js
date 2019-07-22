import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const aCSS = css`
  color: #fff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

const RewardSubscribeTextStyled = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  padding: 25px 0 0 0;
  text-align: center;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.9);

  a {
    ${aCSS}
  }
`

const A = styled.span`
  ${aCSS}
`

const RewardSubscribeText = props => {
  const { userData, summary } = props
  const { isSubscribed } = userData
  const { status } = summary

  let statusCheck = status.toUpperCase()
  let disableOrHide = !['REGISTERED', 'BONDED', 'UNBONDING', 'UNBONDED'].includes(statusCheck)

  return disableOrHide ? null : (
    <RewardSubscribeTextStyled>
      Don't miss your{' '}
      <a
        href="https://forum.livepeer.org/t/why-you-should-bond-your-new-livepeer-tokens-lpt-detailed-version/418"
        target="_blank"
        rel="noopener noreferrer"
      >
        LPT rewards
      </a>{' '}
      -{' '}
      {isSubscribed ? (
        <A onClick={disableOrHide ? null : props.onUnSubscribeBtnHandler}>You can unsubscribe here.</A>
      ) : (
        <Link disabled={disableOrHide} to="/account/subscription">
          Subscribe now!
        </Link>
      )}
    </RewardSubscribeTextStyled>
  )
}

export default RewardSubscribeText
