import withStyles from '@material-ui/core/es/styles/withStyles'
import React from 'react'
import AccountSummarySubscriptionFormDisplayStyle from './AccountSummarySubscriptionFormDisplayStyle'

import Button from '../../../Common/UI/Button/Button'
import Input from '../../../Common/UI/Input/Input'
const AccountSummarySubscriptionFormDisplay = props => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <h1>Welcome to subscription form</h1>
      <form onSubmit={props.onSubmitBtnHandler}>
        <Input
          elementType={props.form.email.elementType}
          elementConfig={props.form.email.elementConfig}
          value={props.form.email.value}
          invalid={!props.form.email.valid}
          shouldValidate={props.form.email.validation}
          touched={props.form.email.touched}
          changed={event => props.inputChangedHandler(event, 'email')}
        />
        <Button btnType="Success" disabled={!props.form.formIsValid} class="subscriptionBtn">
          Subscribe
        </Button>
      </form>
    </div>
  )
}
export default withStyles(AccountSummarySubscriptionFormDisplayStyle)(
  AccountSummarySubscriptionFormDisplay
)
