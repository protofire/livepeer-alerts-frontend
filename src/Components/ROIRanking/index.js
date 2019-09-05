import React, { Component } from 'react'
import Card from '../Common/Card'
import PageTitle from '../Common/PageTitle'
import Table, { TR, TH, TD } from '../Common/Table'
import { truncateStringInTheMiddle, trackGoogleAnalyticPage } from '../../Utils'
import styled from 'styled-components'
import Status from '../Common/Status'
import ArrowUp from '../Common/ArrowUp'
import ArrowDown from '../Common/ArrowDown'
import { rgba } from 'polished'
import logdown from 'logdown'

const logger = logdown('Livepeer:RoiRanking')

const ROICard = styled(Card)`
  max-width: 100%;
  width: ${props => props.theme.themeBreakPoints.xxl};
`

const TableStyled = styled(Table)`
  margin-left: -${props => props.theme.cards.paddingHorizontal};
  margin-right: -${props => props.theme.cards.paddingHorizontal};
  max-width: none;
  padding: 10px 0;
  width: calc(100% + ${props => props.theme.cards.paddingHorizontal} + ${props => props.theme.cards.paddingHorizontal});
`

const THStyled = styled(TH)`
  border-color: ${props => props.theme.colors.borderColor};
  color: #999;
  font-size: 12px;
  font-weight: 500;
`

const TDStyled = styled(TD)`
  border-color: ${props => props.theme.colors.borderColor};
  color: #000;
  font-size: 13px;
  font-weight: 400;
`

const TranscoderWrapper = styled.div`
  align-items: center;
  display: flex;
`

const A = styled.span`
  color: #000;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`

const ABlurred = styled(A)`
  filter: blur(2px);
`

const TempTitle = styled.span`
  align-items: center;
  display: flex;
`

const TempTitleStyled = styled.span`
  background-color: ${props => rgba(props.theme.colors.primary, 0.8)};
  border-radius: 3px;
  color: #fff;
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-left: 15px;
  padding: 5px 10px;
`

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${props => props.theme.cards.paddingVertical};
  padding-left: ${props => props.theme.cards.paddingHorizontal};
  padding-right: ${props => props.theme.cards.paddingHorizontal};
  padding-top: ${props => props.theme.cards.paddingVertical};
  margin-left: auto;
`

const Text = styled.span`
  color: #666;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.2;
  margin-right: 10px;

  &:last-child {
    margin: 0;
  }
`

const data = [
  {
    rank: 1,
    status: 'active',
    address: '0x9e14de5cc84e437518c2c303c88570fe13f0ad15',
    addressTruncated: truncateStringInTheMiddle('0x9e14de5cc84e437518c2c303c88570fe13f0ad15'),
    totalStake: 193306.31,
    rewardCut: '0 %',
    efficiency: '100 %',
    activeRounds: 420,
    roiPer100LPT: 3.0497,
    trend: 'up',
  },
  {
    rank: 2,
    status: 'active',
    address: '0xd18a02647d99dc9f79afbe0f58f8353178e6141f',
    addressTruncated: truncateStringInTheMiddle('0xd18a02647d99dc9f79afbe0f58f8353178e6141f'),
    totalStake: 107651.49,
    rewardCut: '0.16 %',
    efficiency: '100 %',
    activeRounds: 407,
    roiPer100LPT: 3.0449,
    trend: 'up',
  },
  {
    rank: 3,
    status: 'active',
    address: '0x525419ff5707190389bfb5c87c375d710f5fcb0e',
    addressTruncated: truncateStringInTheMiddle('0x525419ff5707190389bfb5c87c375d710f5fcb0e'),
    totalStake: 438101.49,
    rewardCut: '0.2 %',
    efficiency: '100 %',
    activeRounds: 329,
    roiPer100LPT: 3.0436,
    trend: 'up',
  },
  {
    rank: 4,
    status: 'active',
    address: '0xda43d85b8d419a9c51bbf0089c9bd5169c23f2f9',
    addressTruncated: truncateStringInTheMiddle('0xda43d85b8d419a9c51bbf0089c9bd5169c23f2f9'),
    totalStake: 297058.21,
    rewardCut: '0.5 %',
    efficiency: '100 %',
    activeRounds: 401,
    roiPer100LPT: 3.0345,
    trend: 'up',
  },
  {
    rank: 5,
    status: 'active',
    address: '0x4712e01e944802613de3a0a6d23274e7e0243015',
    addressTruncated: truncateStringInTheMiddle('0x4712e01e944802613de3a0a6d23274e7e0243015'),
    totalStake: 147031.82,
    rewardCut: '0.5 %',
    efficiency: '100 %',
    activeRounds: 392,
    roiPer100LPT: 3.0345,
    trend: 'down',
  },
  {
    rank: 6,
    status: 'active',
    address: '0x88e103b26e1a4ce226739d37d356b22afbfeed85',
    addressTruncated: truncateStringInTheMiddle('0x88e103b26e1a4ce226739d37d356b22afbfeed85'),
    totalStake: 105906.54,
    rewardCut: '0.5 %',
    efficiency: '100 %',
    activeRounds: 347,
    roiPer100LPT: 3.0345,
    trend: 'up',
  },
  {
    rank: 7,
    status: 'active',
    address: '0xa6a9eb29e786b5233bd99c0ba28be882fe954a0e',
    addressTruncated: truncateStringInTheMiddle('0xa6a9eb29e786b5233bd99c0ba28be882fe954a0e'),
    totalStake: 158985.97,
    rewardCut: '1 %',
    efficiency: '100 %',
    activeRounds: 352,
    roiPer100LPT: 3.0192,
    trend: 'up',
  },
  {
    rank: 8,
    status: 'active',
    address: '0xdbe6270bcceed7d29ac404fd770eab237253ac9e',
    addressTruncated: truncateStringInTheMiddle('0xdbe6270bcceed7d29ac404fd770eab237253ac9e'),
    totalStake: 122828.07,
    rewardCut: '1 %',
    efficiency: '100 %',
    activeRounds: 354,
    roiPer100LPT: 3.0192,
    trend: 'up',
  },
  {
    rank: 9,
    status: 'active',
    address: '0x21d1130dc36958db75fbb0e5a9e3e5f5680238ff',
    addressTruncated: truncateStringInTheMiddle('0x21d1130dc36958db75fbb0e5a9e3e5f5680238ff'),
    totalStake: 114411.46,
    rewardCut: '1 %',
    efficiency: '100 %',
    activeRounds: 331,
    roiPer100LPT: 3.0192,
    trend: 'down',
  },
  {
    rank: 10,
    status: 'active',
    address: '0xd84781e1a9b74d71ea76cda8bb9f30893bfd00d1',
    addressTruncated: truncateStringInTheMiddle('0xd84781e1a9b74d71ea76cda8bb9f30893bfd00d1'),
    totalStake: 97973.66,
    rewardCut: '1 %',
    efficiency: '96.77 %',
    activeRounds: 338,
    roiPer100LPT: 3.0192,
    trend: 'down',
  },
]

export class ROIRanking extends Component {
  componentDidMount() {
    logger.log('Fire event componentDidMount')
    logger.log('Google analytics: ', '/roi-ranking')
    trackGoogleAnalyticPage('/roi-ranking')
  }

  render() {
    let content = null
    const tableHead = (
      <TR>
        <THStyled textAlign="center">#</THStyled>
        <THStyled>Delegate address</THStyled>
        <THStyled textAlign="right">Total stake</THStyled>
        <THStyled textAlign="right">Reward cut</THStyled>
        <THStyled textAlign="right" title={'Percentage of successful Reward Calls.'}>
          Efficiency
        </THStyled>
        <THStyled textAlign="right">Active rounds</THStyled>
        <THStyled textAlign="right">ROI Per 1000 LPT</THStyled>
        <THStyled textAlign="center" title={'Rewards trend of 30 days.'}>
          Trend
        </THStyled>
      </TR>
    )

    content = (
      <ROICard title={'All you need to know to choose a Livepeer transcoder by ROI'}>
        <TableStyled tableHead={tableHead} fullContainerWidth={true}>
          {data.map((item, index) => (
            <TR key={index}>
              <TDStyled textAlign="center">{item.rank}</TDStyled>
              <TDStyled>
                <TranscoderWrapper>
                  <Status status={item.status} />
                  <ABlurred>{item.addressTruncated}</ABlurred>
                </TranscoderWrapper>
              </TDStyled>
              <TDStyled textAlign="right">{item.totalStake}</TDStyled>
              <TDStyled textAlign="right">{item.rewardCut}</TDStyled>
              <TDStyled textAlign="right">{item.efficiency}</TDStyled>
              <TDStyled textAlign="right">{item.activeRounds}</TDStyled>
              <TDStyled textAlign="right">{item.roiPer100LPT}</TDStyled>
              <TDStyled textAlign="center">{item.trend === 'up' ? <ArrowUp /> : <ArrowDown />}</TDStyled>
            </TR>
          ))}
        </TableStyled>
        <FooterWrapper>
          <Text>10 active transcoders</Text>
        </FooterWrapper>
      </ROICard>
    )

    return (
      <>
        <PageTitle>
          <TempTitle>
            ROI Ranking <TempTitleStyled>Coming Soon</TempTitleStyled>
          </TempTitle>
        </PageTitle>
        {content}
      </>
    )
  }
}
