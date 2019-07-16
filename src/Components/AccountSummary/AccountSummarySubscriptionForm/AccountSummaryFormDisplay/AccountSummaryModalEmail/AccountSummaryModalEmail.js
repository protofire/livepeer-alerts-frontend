import React from 'react'

const accountSummaryModalEmail = props => {
  const { onEmailModalClosed } = props
  return (
    <div>
      {/* <Button variant="outlined" onClick={() => {}}>
        Open dialog
      </Button> */}
      <div>
        Email Sent You have been successfully subscribed, please check your email inbox, in a few
        minutes you will receive an email with your livepeer account information. Please check your
        spam folder in case you did not received it.
        {/* <Button onClick={onEmailModalClosed} color="primary">
            Accept
          </Button> */}
      </div>
    </div>
  )
}
export default accountSummaryModalEmail
