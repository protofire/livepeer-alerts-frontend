import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import GridContainer from '../../Common/UI/Grid/GridContainer.js'
import GridItem from '../../Common/UI/Grid/GridItem.js'

import footerStyle from '../../../assets/jss/dashboard/components/footerStyle'
import { Link } from 'react-router-dom'

function Footer({ ...props }) {
  const { classes, white } = props
  var anchor =
    classes.a +
    cx({
      [' ' + classes.whiteColor]: white
    })
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  })

  return (
    <footer className={`${classes.footer} ${classes.container}`}>
      <GridContainer container={true} justify="space-between">
        <GridItem
          alignItems="center"
          className={`${classes.responsiveFooterElements} ${classes.responsiveFooterElementsLeft}`}
          container={true}
          md={6}
          sm={6}
          xs={12}
        >
          <Link to="/" className={`${block} ${classes.a}`}>
            Terms and conditions
          </Link>
        </GridItem>
        <GridItem
          alignItems="center"
          className={`${classes.responsiveFooterElements} ${classes.responsiveFooterElementsRight}`}
          container={true}
          md={6}
          sm={6}
          xs={12}
        >
          <p>
            &copy; {1900 + new Date().getYear()}{' '}
            <a href="https://www.protofire.io" className={`${anchor} ${classes.a}`}>
              Protofire
            </a>{' '}
            made with love for a better web
          </p>
        </GridItem>
      </GridContainer>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
}

export default withStyles(footerStyle)(Footer)
