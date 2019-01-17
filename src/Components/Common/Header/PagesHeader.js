import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'

import pagesHeaderStyle from '../../../assets/jss/dashboard/components/pagesHeaderStyle.js'
import logoTools from '../../../assets/img/logos/logo-tools.png'

class PagesHeader extends React.Component {
  render() {
    const { classes, color } = this.props
    const appBarClasses = cx({
      [' ' + classes[color]]: color
    })

    const logo = (
      <a href="/" style={{ backgroundImage: 'none' }}>
        <img src={logoTools} alt="" style={{ width: '125px' }} />
      </a>
    )

    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <a href="/" style={{ backgroundImage: 'none', height: '32px' }}>
                <img src={logoTools} alt="" style={{ width: '135px' }} />
              </a>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <span className={classes.title} color="transparent">
                {logo}
              </span>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    )
  }
}

PagesHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
}

export default withStyles(pagesHeaderStyle)(PagesHeader)
