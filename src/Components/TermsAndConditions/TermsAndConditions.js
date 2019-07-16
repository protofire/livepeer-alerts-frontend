import PropTypes from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import logdown from 'logdown'

const logger = logdown('Livepeer:Terms')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

class TermsAndConditionsComponent extends React.Component {
  render() {
    const { classes } = this.props
    /** Google analytics **/
    if (this.props.location && this.props.location.pathname) {
      logger.log('Google analytics: ', this.props.location.pathname)
      ReactGA.pageview(this.props.location.pathname)
    }
    return (
      <div>
        <h2 className={classes.cardTitle}>Terms and Conditions</h2>
        <p className={classes.cardText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies quam a mauris
          viverra, ut viverra libero sagittis. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nunc laoreet vel elit sed commodo. Proin in libero in libero vestibulum
          vestibulum nec et dolor. Ut et nisl vehicula, luctus augue nec, mollis dolor. Quisque
          faucibus gravida pulvinar. Mauris tristique consectetur lectus, sed aliquet sapien lacinia
          vulputate. Maecenas ut lacinia risus. Suspendisse at turpis porttitor, convallis neque sit
          amet, dictum nunc. Morbi posuere mauris vitae orci finibus hendrerit sit amet a augue.
        </p>
        <p className={classes.cardText}>
          Praesent at ex metus. Vivamus et libero rutrum, scelerisque nibh quis, iaculis purus. Ut
          sem lorem, tincidunt ac viverra quis, gravida ut felis. Curabitur id nulla tincidunt,
          tristique arcu nec, volutpat orci. In id ligula sit amet massa auctor condimentum.
          Pellentesque pharetra dignissim vehicula. Etiam eu ultrices dolor. In auctor auctor
          lobortis. Nulla facilisi. Donec dignissim lectus vel massa lacinia tempus. Praesent arcu
          mi, finibus sit amet facilisis ut, egestas non erat.
        </p>
      </div>
    )
  }
}

TermsAndConditionsComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default TermsAndConditionsComponent
