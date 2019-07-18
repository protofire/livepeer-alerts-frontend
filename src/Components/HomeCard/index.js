import React from 'react'
import Card from '../Common/Card'
import styled from 'styled-components'
import IconAlert from './icons/IconAlert'
import IconGroup from './icons/IconGroup'
import Button from '../Common/Button'

const CardHome = styled(Card)`
  flex-shrink: 0;
  margin: 0 auto;
  max-width: 100%;
  width: 480px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    padding: 25px;
  }
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 30px;
  padding-top: 10px;
  text-align: center;
`

const TextContainer = styled.div`
  margin: 0 0 25px;
  padding: 0 5px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    padding: 0 10px;
  }
`

const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 12px;

  > svg {
    flex-shrink: 0;
    margin-right: 15px;
  }
`

const SubTitle = styled.h2`
  flex-grow: 1;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
`

const Paragraph = styled.p`
  color: #333;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 10px;
  padding: 0 0 0 10px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ButtonsContainer = styled.div`
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: 1fr;
  padding: 10px 0 0;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    grid-auto-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-template-columns: none;
  }
`

const ButtonStyled = styled(Button)`
  font-size: 18px;
  height: 44px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    &:first-child {
      grid-column: 1;
    }

    &:nth-child(2) {
      grid-column: 2;
    }
  }
`

class HomeCard extends React.Component {
  render() {
    const { onClick, onDemoClick } = this.props
    const demoAddress = process.env.REACT_APP_DEMO_ADDRESS

    let demoBtnDisabled = typeof demoAddress === 'undefined' || demoAddress.length === 0

    if (!demoBtnDisabled && demoAddress) {
      demoAddress.split(',').forEach(element => {
        /** Checks if the address length is ok **/
        demoBtnDisabled = !(element.length % 42 === 0)
      })
    }

    return (
      <CardHome>
        <Title>Tools for the Livepeer Network</Title>
        <TextContainer>
          <SubTitleContainer>
            <IconAlert />
            <SubTitle>Pro-active alert notifications</SubTitle>
          </SubTitleContainer>
          <Paragraph>
            As a <strong>Token Holder</strong> get to know how your LPTs are performing based on the token inflation and
            whether your delegate is calling the reward (you earn) or not (you loose)
          </Paragraph>
          <Paragraph>
            As a <strong>Transcoder</strong> be notified if there was something wrong with your node and the reward was
            not called in the current round automatically.
          </Paragraph>
        </TextContainer>
        <TextContainer>
          <SubTitleContainer>
            <IconGroup />
            <SubTitle>You and Livepeer</SubTitle>
          </SubTitleContainer>
          <Paragraph>
            A Dashboard that provides an at-a-glance view of your participation in the network and receive tips on how
            to improve your earnings.
          </Paragraph>
        </TextContainer>
        <ButtonsContainer>
          <ButtonStyled onClick={onClick} type="primary">
            Get started
          </ButtonStyled>
          <ButtonStyled onClick={onDemoClick} disabled={demoBtnDisabled} type="secondary">
            Demo
          </ButtonStyled>
        </ButtonsContainer>
      </CardHome>
    )
  }
}

export default HomeCard
