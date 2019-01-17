import GridContainer from '../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../Common/UI/Grid/GridItem.js'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AccountSummaryStyle from '../../../assets/jss/dashboard/views/accountSummaryStyle'
import Reward from './Blocks/Reward'
import Status from './Blocks/Status'
import Wallet from './Blocks/Wallet'

const AccountSummaryHome = props => {
  const { classes } = props

  return (
    <GridContainer className={classes.gridContainer} justify="center">
      <GridItem className={classes.itemsContainer} lg={12} md={12} xs={12}>
        {/* Wallet block */}
        <Wallet {...props} />
        {/* Status block */}
        <Status {...props} />
      </GridItem>
      {/* Reward calls */}
      <Reward {...props} />
    </GridContainer>
  )
}
export default withStyles(theme => ({
  ...AccountSummaryStyle
}))(AccountSummaryHome)
