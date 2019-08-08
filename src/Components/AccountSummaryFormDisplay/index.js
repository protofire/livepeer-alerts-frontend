import React from 'react'
import Card from '../Common/Card'
import ButtonClose from '../Common/ButtonClose'
import Button from '../Common/Button'
import Textfield from '../Common/Textfield'
import RadioInput from '../Common/RadioInput'
import styled from 'styled-components'

const CardSubscriptionForm = styled(Card)`
  flex-shrink: 0;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  width: 280px;
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

const DescriptionTextExtra = styled(DescriptionText)`
  padding-top: 0;
`

const TextfieldStyled = styled(Textfield)`
  margin: 0 0 25px;
`

const SubTitle = styled.h3`
  color: ${props => props.theme.cards.textColorSecondary};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 10px;
  text-align: left;
`

const ButtonCloseStyled = styled(ButtonClose)`
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 123;
`

const Options = styled.div`
  padding-bottom: 20px;
`

const Option = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const OptionText = styled.label`
  color: ${props => props.theme.cards.textColorSecondary};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 0 7px;
  text-align: left;
`

const ButtonsContainer = styled.div`
  display: flex;
  padding: 10px 0 0;
`

const ButtonStyled = styled(Button)`
  flex-grow: 1;
`

const StopNotifications = styled.span`
  color: ${props => props.theme.colors.alert};
  cursor: pointer;
  font-weight: 700;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

class AccountSummaryFormDisplay extends React.Component {
  render = () => {
    const {
      form,
      inputChangedHandler,
      frequencyChangedHandler,
      onCancelBtnHandler,
      onSubmitBtnHandler,
      onUnsubscribeBtnHandler,
      isSubscribed,
      ...restProps
    } = this.props
    const { option } = form.checkbox

    return (
      <CardSubscriptionForm title="Subscribe" {...restProps}>
        <ButtonCloseStyled onClick={onCancelBtnHandler} />
        <DescriptionText>We’ll send you an email when your account requires action on your part.</DescriptionText>
        <TextfieldStyled
          invalid={`${!form.email.valid}`}
          onChange={event => inputChangedHandler(event, 'email')}
          placeholder="your@email.com"
          touched={`${form.email.touched}`}
          type="email"
          value={form.email.value}
        />
        <SubTitle>How Often?</SubTitle>
        <Options>
          <Option onClick={() => frequencyChangedHandler('daily')}>
            <RadioInput checked={option === 'daily'} />
            <OptionText>Daily</OptionText>
          </Option>
          <Option onClick={() => frequencyChangedHandler('weekly')}>
            <RadioInput checked={option === 'weekly'} />
            <OptionText>Weekly</OptionText>
          </Option>
        </Options>
        {isSubscribed ? (
          <>
            <SubTitle>Unsubscribe</SubTitle>
            <DescriptionTextExtra>
              You can turn off notifications simply clicking{' '}
              <StopNotifications onClick={onUnsubscribeBtnHandler}>Stop Receiving Notifications.</StopNotifications>
            </DescriptionTextExtra>
          </>
        ) : null}
        <ButtonsContainer>
          <ButtonStyled disabled={!form.formIsValid} onClick={onSubmitBtnHandler} type="primary">
            {isSubscribed ? 'Update' : 'Subscribe'}
          </ButtonStyled>
        </ButtonsContainer>
      </CardSubscriptionForm>
    )
  }
}
export default AccountSummaryFormDisplay
