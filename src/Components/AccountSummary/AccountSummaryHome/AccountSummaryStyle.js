// ##############################
// // // AccountSummary view styles
// #############################

const maxWidthContainer = '700px'
const commonSeparation = '30px'

const AccountSummaryStyle = {
  gridContainer: {
    margin: '0',
    position: 'relative',
    width: '100%',
    zIndex: '12'
  },
  gridItem: {
    padding: '0!important'
  },
  itemsContainer: {
    maxWidth: maxWidthContainer,
    display: 'grid',
    gridRowGap: commonSeparation,
    gridTemplateColumns: '1fr',
    marginBottom: commonSeparation,
    '@media (min-width: 1024px)': {
      gridColumnGap: commonSeparation,
      gridTemplateColumns: '1fr 1fr'
    }
  },
  itemsContainerFull: {
    maxWidth: maxWidthContainer,
    marginBottom: commonSeparation
  },
  cardItem: {
    margin: '0',
    padding: '20px'
  },
  logoMetamask: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: '50%',
    height: '100px',
    margin: '0 auto 10px',
    width: '100px'
  },
  logoMetamaskImg: {
    height: '75px',
    width: '75px'
  },
  walletTitle: {
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: '700',
    margin: '0 0 25px'
  },
  rewardTitle: {
    fontSize: '20px',
    textAlign: 'center',
    fontWeight: '700',
    margin: '0 0 15px'
  },
  rewardText: {
    color: '#333',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: '400',
    margin: '0'
  },
  subscribeText: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'center',
    fontWeight: '500',
    textShadow: '0 5px 5px rgba(0, 0, 0, 0.5)',
    margin: '0 0 -15px'
  },
  lessMarginBottom: {
    marginBottom: '10px'
  },
  topInfo: {
    margin: '0 0 25px'
  },
  walletInfo: {
    fontSize: '16px',
    fontWeight: '300',
    color: '#3C4858',
    lineHeight: '1.2',
    margin: '0 0 5px',
    textAlign: 'center'
  },
  blockData: {
    minHeight: '60px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  blockDataItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #ddd',
    borderTop: '1px solid #ddd',
    flexDirection: 'column',
    flexGrow: '1',
    '&:last-child': {
      borderRight: 'none'
    }
  },
  blockDataItemValue: {
    fontSize: '16px',
    fontWeight: '300',
    color: '#3C4858',
    lineHeight: '1.2',
    margin: '0 0 5px'
  },
  blockDataItemTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#333',
    lineHeight: '1.2',
    margin: '0'
  },
  blockDataItemMainTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#333',
    lineHeight: '1.2',
    margin: '10px 0'
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
