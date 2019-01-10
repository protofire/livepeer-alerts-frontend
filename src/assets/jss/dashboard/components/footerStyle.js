// ##############################
// // // Footer styles
// #############################

import { defaultFont, container, containerFluid, primaryColor } from '../../dashboard.js'

const footerStyle = {
  block: {},
  left: {
    float: 'left!important',
    display: 'block'
  },
  right: {
    margin: '0',
    fontSize: '14px',
    float: 'right!important',
    padding: '15px'
  },
  footer: {
    bottom: '0',
    borderTop: '1px solid #e7e7e7',
    padding: '15px 0',
    ...defaultFont,
    zIndex: 4
  },
  container: {
    zIndex: 3,
    ...container,
    position: 'relative'
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: 'relative'
  },
  a: {
    backgroundColor: 'transparent',
    color: primaryColor,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0'
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0',
    width: 'auto'
  },
  whiteColor: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF'
    }
  },
  responsiveFooterElements: {
    justifyContent: 'center'
  },
  responsiveFooterElementsLeft: {
    marginBottom: '10px',
    '@media (min-width: 768px)': {
      justifyContent: 'flex-start',
      marginBottom: '0'
    }
  },
  responsiveFooterElementsRight: {
    '@media (min-width: 768px)': {
      justifyContent: 'flex-end'
    }
  }
}
export default footerStyle
