import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline'
import Code from '@material-ui/icons/Code'
import Group from '@material-ui/icons/Group'

// core components
import GridContainer from '../Common/Grid/GridContainer.js'
import GridItem from '../Common/Grid/GridItem.js'
import Button from '../Common/CustomButtons/Button.js'
import InfoArea from '../Common/InfoArea/InfoArea.js'
import Card from '../Common/Card/Card.js'
import CardBody from '../Common/Card/CardBody.js'

import homeCardStyle from '../../assets/jss/dashboard/views/homeCardStyle'

class HomeCard extends React.Component {
  render() {
    const { classes, onClick } = this.props
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Marketing"
                      description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Fully Coded in HTML5"
                      description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Built Audience"
                      description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <div
                      className={classes.center}
                      style={{ paddingTop: '40%', paddingBottom: '40%' }}
                    >
                      <Button onClick={onClick} round color="primary" size="lg">
                        Get started
                      </Button>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(homeCardStyle)(HomeCard)
