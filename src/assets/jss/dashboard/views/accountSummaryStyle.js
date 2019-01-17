// ##############################
// // // AccountSummary view styles
// #############################

const maxWidthContainer = '700px'
const commonSeparation = '30px'

const AccountSummaryStyle = {
  gridContainer: {
    margin: '0 auto',
    maxWidth: '100%',
    position: 'relative',
    width: maxWidthContainer,
    zIndex: '12'
  },
  gridItem: {
    padding: '0!important'
  },
  gridItemHidden: {
    display: 'none!important'
  },
  itemsContainer: {
    maxWidth: maxWidthContainer,
    display: 'grid',
    gridRowGap: commonSeparation,
    gridTemplateColumns: '1fr',
    marginBottom: commonSeparation,
    '@media (min-width: 768px)': {
      gridColumnGap: commonSeparation,
      gridTemplateColumns: '1fr 1fr'
    }
  },
  itemsContainerFull: {
    // maxWidth: maxWidthContainer,
    marginBottom: commonSeparation
  },
  cardItem: {
    margin: '0',
    padding: '20px'
  },
  alignFlexEnd: {
    justifyContent: 'flex-end'
  },
  logoMetamask: {
    border: '2px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: '50%',
    height: '85px',
    margin: '-55px auto 15px',
    width: '85px'
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
  rewardTitleBig: {
    fontSize: '24px'
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
    margin: '0',
    padding: '0'
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
    },
    maxWidth: '50%',
    width: '50%'
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
  buttonsContainer: {
    maxWidth: maxWidthContainer,
    display: 'grid',
    gridRowGap: '15px',
    gridTemplateColumns: '1fr',
    marginBottom: commonSeparation,
    '@media (min-width: 768px)': {
      gridColumnGap: commonSeparation,
      gridTemplateColumns: '1fr 1fr'
    }
  },
  buttonContainerItem: {
    '@media (min-width: 768px)': {
      flexWrap: 'nowrap'
    }
  },
  subscriptionBtn: {
    width: '100%'
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
