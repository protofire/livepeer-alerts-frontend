import AccountSummarySubscriptionFormDisplayStyle from '../../../../assets/jss/dashboard/views/AccountSummarySubscriptionFormDisplayStyle'
import Button from '../../../Common/UI/CustomButtons/Button'
import Card from '../../../Common/UI/Card/Card.js'
import GridContainer from '../../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../../Common/UI/Grid/GridItem.js'
import Input from '../../../Common/UI/Input/Input'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const accountSummarySubscriptionFormDisplay = props => {
  const { classes, form } = props
  return (
    <GridContainer className={classes.gridContainer} justify="center" alignItems="center">
      <GridItem className={classes.cardContainer}>
        <Card className={classes.cardSignup}>
          <h2 className={classes.cardTitle}>Subscribe:</h2>
          <form>
            <Input
              changed={event => props.inputChangedHandler(event, 'email')}
              elementConfig={form.email.elementConfig}
              elementType={form.email.elementType}
              invalid={!form.email.valid}
              shouldValidate={form.email.validation}
              touched={form.email.touched}
              value={form.email.value}
            />
            <Button
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
            </Button>
          </form>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
export default withStyles(AccountSummarySubscriptionFormDisplayStyle)(
  accountSummarySubscriptionFormDisplay
)
