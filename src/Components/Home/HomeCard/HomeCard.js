import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline'
import Code from '@material-ui/icons/Code'
import Group from '@material-ui/icons/Group'

// core components
import GridContainer from '../../Common/Grid/GridContainer.js'
import GridItem from '../../Common/Grid/GridItem.js'
import Button from '../../Common/UI/CustomButtons/Button.js'
import InfoArea from '../../Common/UI/InfoArea/InfoArea.js'
import Card from '../../Common/UI/Card/Card.js'
import CardBody from '../../Common/UI/Card/CardBody.js'

import homeCardStyle from '../../../assets/jss/dashboard/views/homeCardStyle'

class HomeCard extends React.Component {
  render() {
    const { classes, onClick } = this.props
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Livepeer Notifications</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Pro-active alert notifications"
                      description="We provide pro-active alert notifications that will help LPT token holders to be updated about how the transcoders are performing in near real time"
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Account information summary"
                      description="You can see also a summary of your account information and your livepeer balance"
                      icon={Group}
                      iconColor="info"
                    />
                    <InfoArea title="Open source" description="" icon={Code} iconColor="primary" />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <div
                      className={classes.center}
                      style={{ paddingTop: '50%', paddingBottom: '40%' }}
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
