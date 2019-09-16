import React from 'react'
import Card from '../Common/Card'
import styled from 'styled-components'
import IconAlert from './icons/IconAlert'
import IconGroup from './icons/IconGroup'
import Button from '../Common/Button'
import Checkbox from '../Common/Checkbox'
import Tooltip from '../Common/Tooltip'

const CardHome = styled(Card)`
  flex-shrink: 0;
  margin: 0 auto;
  max-width: 100%;
  width: 430px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    padding: 20px;
  }
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 25px;
  text-align: left;
`

const TextContainer = styled.div`
  margin: 0 0 25px;
`

const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 8px;

  > svg {
    flex-shrink: 0;
    margin-right: 10px;
  }
`

const SubTitle = styled.h2`
  flex-grow: 1;
  font-size: 21px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
`

const Paragraph = styled.p`
  color: #333;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.35;
  margin: 0 0 10px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ButtonsContainer = styled.div`
  padding: 15px 0 0;
`

const ButtonStyled = styled(Button)`
  font-size: 18px;
  height: 44px;
  width: 100%;
`

const WarningContainer = styled.div`
  display: flex;
  margin: 0 0 15px;
`

const CheckboxStyled = styled(Checkbox)`
  margin: 0 10px 0 0;
`

const WarningText = styled.div`
  color: #333;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  margin: 0;
  text-align: left;
`

const TooltipStyled = styled(Tooltip)`
  display: inline;
`

class HomeCard extends React.Component {
  state = {
    acceptedCookies: false,
  }

  toggleAcceptCookies = () => {
    this.setState({ acceptedCookies: !this.state.acceptedCookies })
  }

  render() {
    const { onClick } = this.props
    const demoAddress = process.env.REACT_APP_DEMO_ADDRESS

    let demoBtnDisabled = typeof demoAddress === 'undefined' || demoAddress.length === 0

    if (!demoBtnDisabled && demoAddress) {
      demoAddress.split(',').forEach(element => {
        // Checks if the address length is ok
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
          <WarningContainer>
            <CheckboxStyled checked={this.state.acceptedCookies} onChange={this.toggleAcceptCookies} />
            <WarningText>
              You accept the use of cookies and other tracking technologies on this site.
              <TooltipStyled description="This data will be used to assist users with navigation and their ability to provide feedback, analyze use of our products and services, assist with our promotional and marketing efforts, and provide content from third parties." />
            </WarningText>
          </WarningContainer>
          <ButtonStyled disabled={!this.state.acceptedCookies} onClick={onClick} type="primary">
            Get started
          </ButtonStyled>
        </ButtonsContainer>
      </CardHome>
    )
  }
}

export default HomeCard
