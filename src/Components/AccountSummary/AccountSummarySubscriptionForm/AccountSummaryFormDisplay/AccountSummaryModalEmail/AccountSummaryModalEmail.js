import React, { Component } from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '../../../../Common/UI/CustomButtons/Button'
import Dialog from '@material-ui/core/Dialog'

export class AccountSummaryModalEmail extends Component {
  state = {
    open: false
  }

  render() {
    return (
      <div>
        <Button variant="outlined" onClick={() => {}}>
          Open dialog
        </Button>
        <Dialog onClose={() => {}} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={() => {}}>
            Email Sent
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              You have been successfully subscribed, please check your email inbox. Please note that
              the email could be received on the spam folder
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {}} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default AccountSummaryModalEmail
