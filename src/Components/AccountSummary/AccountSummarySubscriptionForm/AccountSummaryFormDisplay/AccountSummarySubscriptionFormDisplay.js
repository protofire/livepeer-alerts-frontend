import React from 'react'

const accountSummarySubscriptionFormDisplay = props => {
  const { classes, form } = props
  return (
    <div>
      <div>
        <div>
          <h2 className={classes.cardTitle}>Subscribe:</h2>
          <form>
            {/* <Input
              changed={event => props.inputChangedHandler(event, 'email')}
              elementConfig={form.email.elementConfig}
              elementType={form.email.elementType}
              invalid={!form.email.valid}
              shouldValidate={form.email.validation}
              touched={form.email.touched}
              value={form.email.value}
            /> */}
            {/* <Button
              className={classes.subscribeButton}
              color="warning"
              round
              size="lg"
              onClick={props.onCancelBtnHandler}
            >
              Cancel
            </Button>
            <Button
              className={classes.subscribeButton}
              color="primary"
              disabled={!form.formIsValid}
              round
              size="lg"
              onClick={props.onSubmitBtnHandler}
            >
              Subscribe
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  )
}
export default accountSummarySubscriptionFormDisplay
