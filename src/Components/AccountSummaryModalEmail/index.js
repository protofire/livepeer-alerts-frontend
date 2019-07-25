import React from 'react'
import Card from '../Common/Card'
import ButtonClose from '../Common/ButtonClose'
import Button from '../Common/Button'
import styled from 'styled-components'

const CardSubscriptionMessage = styled(Card)`
  flex-shrink: 0;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  width: 280px;
`

const ButtonCloseStyled = styled(ButtonClose)`
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 123;
`

const DescriptionText = styled.p`
  color: ${props => props.theme.cards.textColorSecondary};
  font-size: 14px;
  font-weight: normal;
  line-height: 1.36;
  margin: 0 0 20px;
  padding: 13px 0 0 0;
  text-align: left;
`

const ButtonsContainer = styled.div`
  display: flex;
  padding: 10px 0 0;
`

const ButtonStyled = styled(Button)`
  flex-grow: 1;
`

const accountSummaryModalEmail = props => {
  const { onEmailModalClosed } = props

  return (
    <CardSubscriptionMessage title="Email Sent">
      <ButtonCloseStyled onClick={onEmailModalClosed} />
      <DescriptionText>
        You have been successfully subscribed, please check your email inbox, in a few minutes you will receive an email
        with your livepeer account information. Please check your spam folder in case you did not received it.
      </DescriptionText>
      <ButtonsContainer>
        <ButtonStyled onClick={onEmailModalClosed} type="primary">
          OK
        </ButtonStyled>
      </ButtonsContainer>
    </CardSubscriptionMessage>
  )
}

export default accountSummaryModalEmail
