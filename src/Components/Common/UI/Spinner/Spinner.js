import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

const spinner = props => {
  const { classes } = props
  let displayMsg = props.displayMsg ? <h3>{props.displayMsg}</h3> : null
  return (
    <div>
      {displayMsg}
      <CircularProgress className={classes.progress} />
    </div>
  )
}

spinner.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(spinner)
