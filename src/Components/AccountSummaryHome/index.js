import React from 'react'
import RewardSubscribeText from '../RewardSubscribeText'
import StatusDelegate from '../StatusDelegate'
import StatusDelegator from '../StatusDelegator'
import Wallet from '../Wallet'
import PageTitle from '../Common/PageTitle'
import TranscoderInfo from '../TranscoderInfo'
import EarnedRewards from '../EarnedRewards'
import styled from 'styled-components'
import LPTRewards from '../LPTRewards'

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

const MultiBlocksRowTop = styled(MultiBlocksRow)`
  margin-bottom: 40px;
`

const AccountSummaryHome = props => {
  const isDelegate = props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder'

  return (
    <AccountSummaryHomeContainer>
      <MultiBlocksRowTop>
        <Wallet {...props} />
        {isDelegate ? <StatusDelegate {...props} /> : <StatusDelegator {...props} />}
      </MultiBlocksRowTop>
      <PageTitle>My Transcoder</PageTitle>
      <MultiBlocksRow>
        <TranscoderInfo />
        <EarnedRewards />
      </MultiBlocksRow>
      <LPTRewards {...props} />
      {/* <Reward {...props} /> */}
      <RewardSubscribeText {...props} />
    </AccountSummaryHomeContainer>
  )
}
export default AccountSummaryHome
