import AccSummarySubscriptionFormDisplayStyle from './AccSummarySubscriptionFormDisplayStyle'
import Button from '../../../Common/UI/CustomButtons/Button'
import Card from '../../../Common/UI/Card/Card.js'
import GridContainer from '../../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../../Common/UI/Grid/GridItem.js'
import Input from '../../../Common/UI/Input/Input'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const accountSummarySubscriptionFormDisplay = props => {
  const { classes } = props
  return (
    <GridContainer className={classes.gridContainer} justify="center" alignItems="center">
      <GridItem className={classes.cardContainer}>
        <Card className={classes.cardSignup}>
          <h2 className={classes.cardTitle}>Subscribe:</h2>
          <form>
            <Input
              changed={event => props.inputChangedHandler(event, 'email')}
              elementConfig={props.form.email.elementConfig}
              elementType={props.form.email.elementType}
              invalid={!props.form.email.valid}
              shouldValidate={props.form.email.validation}
              touched={props.form.email.touched}
              value={props.form.email.value}
            />
            <Button
              className={classes.subscribeButton}
              color="primary"
              disabled={!props.form.formIsValid}
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
export default withStyles(AccSummarySubscriptionFormDisplayStyle)(
  accountSummarySubscriptionFormDisplay
)
