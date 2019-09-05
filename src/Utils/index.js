import BigNumber from 'bignumber.js'
import { SUPPORTED_FREQUENCIES } from '../Utils/constants'
import ReactGA from 'react-ga'
import logdown from 'logdown'

const logger = logdown('Utils')

const truncateStringInTheMiddle = (str, strLength = 41, strPositionStart = 8, strPositionEnd = 8) => {
  if (typeof str === 'string' && str.length > strLength) {
    return `${str.substr(0, strPositionStart)}...${str.substr(str.length - strPositionEnd, str.length)}`
  }
  return str
}

const toFixedDecimals = (x = 0, decimals = 4) => {
  return new BigNumber(x).toFixed(decimals)
}

const decimalPlaces = (x = 0, decimals = 4) => {
  return new BigNumber(x).decimalPlaces(decimals).toString()
}

const isFrequencySupported = newFrequency => {
  if (!newFrequency) {
    return false
  }
  return SUPPORTED_FREQUENCIES.includes(newFrequency)
}

const trackGoogleAnalyticPage = page => {
  const googleAnalyticsUID = process.env.REACT_APP_GOOGLE_ANALYTICS_UID
  const isCorrectEnviroment = ['production', 'staging'].includes(process.env.NODE_ENV)

  if (isCorrectEnviroment && googleAnalyticsUID) {
    logger.log('Initialization of google analytics with UID: ', googleAnalyticsUID)
    ReactGA.initialize(googleAnalyticsUID)
    ReactGA.pageview(page)
  }
}

export { truncateStringInTheMiddle, decimalPlaces, isFrequencySupported, toFixedDecimals, trackGoogleAnalyticPage }
