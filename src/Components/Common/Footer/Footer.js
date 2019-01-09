import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import footerStyle from '../../../assets/jss/dashboard/components/footerStyle'
import { Link } from 'react-router-dom'

function Footer({ ...props }) {
  const { classes, fluid, white } = props
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  })
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
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/terms" className={block}>
                Terms and conditions
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href="https://www.protofire.io" className={anchor}>
            Protofire
          </a>{' '}
          made with love for a better web
        </p>
      </div>
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
