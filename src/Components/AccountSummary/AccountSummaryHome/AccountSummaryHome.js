import GridContainer from '../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../Common/UI/Grid/GridItem.js'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AccountSummaryStyle from '../../../assets/jss/dashboard/views/accountSummaryStyle'
import Reward from './Blocks/Reward/Reward'
import StatusDelegator from './Blocks/Status/StatusDelegator'
import Wallet from './Blocks/Wallet'
import StatusDelegate from './Blocks/Status/StatusDelegate'

const AccountSummaryHome = props => {
  const { classes } = props
  let statusBlock = <StatusDelegator {...props} />
  // If the user is a delegate we show the delegate component, otherwise we show the delegator component
  if (props.summary && props.summary.role && props.summary.role.toLowerCase() === 'transcoder') {
    statusBlock = <StatusDelegate {...props} />
  }

  return (
    <GridContainer className={classes.gridContainer} justify="center">
      <GridItem className={classes.itemsContainer} lg={12} md={12} xs={12}>
        {/* Wallet block */}
        <Wallet {...props} />
        {/* Status block */}
        {statusBlock}
      </GridItem>
      {/* Reward calls */}
      <Reward {...props} />
    </GridContainer>
  )
}
export default withStyles(theme => ({
  ...AccountSummaryStyle
}))(AccountSummaryHome)
