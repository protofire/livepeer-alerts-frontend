import React from 'react'
import Reward from '../Reward'
import RewardSubscribeText from '../RewardSubscribeText'
import StatusDelegate from '../StatusDelegate'
import StatusDelegator from '../StatusDelegator'
import Wallet from '../Wallet'
import styled from 'styled-components'

const AccountSummaryHomeContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 574px;
`
const MultiBlocksRow = styled.div`
  display: grid;
  grid-row-gap: ${props => props.theme.margins.blockSeparation};
  grid-template-columns: 1fr;
  margin-bottom: ${props => props.theme.margins.blockSeparation};

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    grid-column-gap: ${props => props.theme.margins.blockSeparation};
    grid-template-columns: 1fr 1fr;
  }
`

const AccountSummaryHome = props => {
  const isDelegate = props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder'

  return (
    <AccountSummaryHomeContainer>
      <MultiBlocksRow>
        <Wallet {...props} />
        {isDelegate ? <StatusDelegate {...props} /> : <StatusDelegator {...props} />}
      </MultiBlocksRow>
      <Reward {...props} />
      <RewardSubscribeText {...props} />
    </AccountSummaryHomeContainer>
  )
}
export default AccountSummaryHome
