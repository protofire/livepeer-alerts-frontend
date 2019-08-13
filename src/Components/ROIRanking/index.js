import React, { Component } from 'react'
import Card from '../Common/Card'
import Pagination from '../Common/Pagination'
import PageTitle from '../Common/PageTitle'
import Table, { TR, TH, TD } from '../Common/Table'
import styled from 'styled-components'
import Status from '../Common/Status'
import ArrowUp from '../Common/ArrowUp'
import ArrowDown from '../Common/ArrowDown'
import { rgba } from 'polished'
import ReactGA from 'react-ga'
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

const A = styled.a`
  color: #000;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
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

const data = [
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '1',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'active',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'up',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '2',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'inactive',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'down',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '3',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'active',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'up',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '4',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'inactive',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'down',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '5',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'active',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'up',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '6',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'inactive',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'down',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '7',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'active',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'up',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '8',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'inactive',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'down',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '9',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'active',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'up',
  },
  {
    efficiency: '100%',
    lastRound: '1378',
    qtyRounds: '120',
    rank: '10',
    rewardCut: '75%',
    roiETH: '0.0821660',
    roiPer100LPT: '3.2176',
    status: 'inactive',
    totalStake: '42184.75',
    transcoder: '0x1234...7890',
    trend: 'down',
  },
]

export class ROIRanking extends Component {
  componentDidMount = async () => {
    logger.log('Fire event componentDidMount')

    logger.log('Google analytics: ', '/roi-ranking')
    ReactGA.pageview('/roi-ranking')
  }

  render = () => {
    let content = null
    const tableHead = (
      <TR>
        <THStyled textAlign="center">#</THStyled>
        <THStyled>Transcoder</THStyled>
        <THStyled textAlign="right">Total Stake</THStyled>
        <THStyled textAlign="right">Reward Cut</THStyled>
        <THStyled textAlign="right">Efficiency</THStyled>
        <THStyled textAlign="right">ROI Per 1000 LPT</THStyled>
        <THStyled textAlign="right">ROI (ETH)</THStyled>
        <THStyled textAlign="right">QTY Rounds</THStyled>
        <THStyled textAlign="right">Last Round</THStyled>
        <THStyled textAlign="center">Trend</THStyled>
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
                  <ABlurred rel="noopener noreferrer" href={`#${item.transcoder}`} target="_blank">
                    {item.transcoder}
                  </ABlurred>
                </TranscoderWrapper>
              </TDStyled>
              <TDStyled textAlign="right">{item.totalStake}</TDStyled>
              <TDStyled textAlign="right">{item.rewardCut}</TDStyled>
              <TDStyled textAlign="right">{item.efficiency}</TDStyled>
              <TDStyled textAlign="right">{item.roiPer100LPT}</TDStyled>
              <TDStyled textAlign="right">{item.roiETH}</TDStyled>
              <TDStyled textAlign="right">{item.qtyRounds}</TDStyled>
              <TDStyled textAlign="right">{item.lastRound}</TDStyled>
              <TDStyled textAlign="center">{item.trend === 'up' ? <ArrowUp /> : <ArrowDown />}</TDStyled>
            </TR>
          ))}
        </TableStyled>
        <Pagination>{/* <SchemaLink onClick={this.showSchema}>Schema</SchemaLink> */}</Pagination>
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
