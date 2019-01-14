// ##############################
// // // AccountSummary view styles
// #############################

import { cardTitle } from '../../../assets/jss/dashboard'

const AccountSummaryStyle = {
  container: {
    width: '100%',
    position: 'relative',
    zIndex: '3'
  },
  cardTitle: {
    ...cardTitle
  },
  cardContainer: {
    width: '1000px',
    maxWidth: '100%'
  },
  cardAccountSummary: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    marginBottom: '0',
    padding: '20px 25px',
    marginTop: '0vh'
  },
  socialTitle: {
    fontSize: '18px'
  },
  gridContainer: {
    zIndex: '12'
  },
  buttonContainer: {
    margin: '0'
  },
  buttonContainerItem: {
    //padding: '0!important'
  },
  noWrap: {
    whiteSpace: 'nowrap'
  },
  pL0: {
    paddingLeft: '0'
  },
  pR0: {
    paddingLeft: '0'
  },
  textRight: {
    textAlign: 'right'
  },
  wordBreak: {
    wordBreak: 'break-all'
  },
  tableTitle: {
    fontSize: '16px',
    fontWeight: '500'
  }
}

export default AccountSummaryStyle
