// ##############################
// // // AccSummarySubscriptionForm view styles
// #############################

import { container, cardTitle } from '../../../../assets/jss/dashboard'

const AccSummarySubscriptionFormDisplayStyle = {
  container: {
    ...container,
    position: 'relative',
    zIndex: '3'
  },
  cardTitle: {
    ...cardTitle,
    textAlign: 'center'
  },
  cardContainer: {
    width: '430px',
    maxWidth: '100%'
  },
  gridContainer: {
    margin: '0',
    position: 'relative',
    width: '100%',
    zIndex: '12'
  },
  cardSignup: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    marginBottom: '0',
    padding: '20px 25px',
    marginTop: '0vh'
  },
  subscribeButton: {
    marginTop: '20px',
    width: '100%'
  }
}

export default AccSummarySubscriptionFormDisplayStyle
