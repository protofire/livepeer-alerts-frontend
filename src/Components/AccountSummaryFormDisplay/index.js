import React from 'react'

const accountSummarySubscriptionFormDisplay = props => {
  const { form } = props
  return (
    <div>
      <div>
        <div>
          <h2>Subscribe:</h2>
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
              color="warning"
              round
              size="lg"
              onClick={props.onCancelBtnHandler}
            >
              Cancel
            </Button>
            <Button
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
