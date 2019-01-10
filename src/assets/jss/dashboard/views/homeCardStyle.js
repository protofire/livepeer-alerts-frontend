// ##############################
// // // HomeCard view styles
// #############################

import { container, cardTitle } from '../../dashboard.js'

import customCheckboxRadioSwitch from '../customCheckboxRadioSwitch.js'

const homeCardStyle = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: 'center'
  },
  container: {
    ...container,
    position: 'relative',
    zIndex: '3'
    // paddingTop: "23vh"
  },
  cardSignup: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    marginBottom: '0',
    padding: '20px 25px',
    marginTop: '0vh'
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  },
  form: {
    padding: '0 20px',
    position: 'relative'
  },
  socialTitle: {
    fontSize: '18px'
  },
  inputAdornment: {
    marginRight: '18px',
    position: 'relative'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  customFormControlClasses: {
    margin: '0 12px'
  },
  checkboxLabelControl: {
    margin: '0'
  },
  checkboxLabel: {
    marginLeft: '6px',
    color: 'rgba(0, 0, 0, 0.26)'
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
  }
}

export default homeCardStyle
