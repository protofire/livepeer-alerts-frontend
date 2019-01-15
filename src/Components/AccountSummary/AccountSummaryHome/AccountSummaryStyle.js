// ##############################
// // // AccountSummary view styles
// #############################

import { cardTitle } from '../../../assets/jss/dashboard'

const AccountSummaryStyle = {
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
    margin: '0',
    position: 'relative',
    width: '100%',
    zIndex: '12'
  },
  gridItem: {
    padding: '0!important',
    '@media (min-width: 1024px)': {
      padding: '0 15px !important',
      '&:first-child': {
        paddingLeft: '0!important'
      },
      '&:last-child': {
        paddingRight: '0!important'
      }
    }
  },
  buttonContainer: {
    margin: '20px 0 0 0',
    width: '100%'
  },
  buttonContainerItem: {
    '@media (min-width: 768px)': {
      flexWrap: 'nowrap'
    }
  },
  subscriptionBtn: {
    marginBottom: '10px',
    width: '100%',
    '&:last-child': {
      marginBottom: '0'
    },
    '@media (min-width: 768px)': {
      marginBottom: '0',
      marginRight: '20px',
      width: '50%',
      '&:last-child': {
        marginRight: '0'
      }
    }
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
  textLeft: {
    textAlign: 'left'
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
