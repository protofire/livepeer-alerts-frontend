import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import AccSummarySubscriptionFormDisplayStyle from './AccSummarySubscriptionFormDisplayStyle'

import Button from '../../../Common/UI/Button/Button'
import Input from '../../../Common/UI/Input/Input'
const accountSummarySubscriptionFormDisplay = props => {
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
export default withStyles(AccSummarySubscriptionFormDisplayStyle)(
  accountSummarySubscriptionFormDisplay
)
