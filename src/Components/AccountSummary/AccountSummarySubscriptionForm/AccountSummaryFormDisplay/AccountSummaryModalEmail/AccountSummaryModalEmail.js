import React from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '../../../../Common/UI/CustomButtons/Button'
import Dialog from '@material-ui/core/Dialog'
const accountSummaryModalEmail = props => {
  const { onEmailModalClosed } = props
  return (
    <div>
      <Button variant="outlined" onClick={() => {}}>
        Open dialog
      </Button>
      <Dialog onClose={onEmailModalClosed} aria-labelledby="customized-dialog-title" open>
        <DialogTitle id="customized-dialog-title" onClose={onEmailModalClosed}>
          Email Sent
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You have been successfully subscribed, please check your email inbox, in a few minutes
            you will receive an email with your livepeer account information. Please check your spam
            folder in case you did not received it.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onEmailModalClosed} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default accountSummaryModalEmail
