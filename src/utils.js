import BigNumber from 'bignumber.js'

const truncateStringInTheMiddle = (
  str,
  strLength = 41,
  strPositionStart = 8,
  strPositionEnd = 8
) => {
  if (typeof str === 'string' && str.length > strLength) {
    return `${str.substr(0, strPositionStart)}...${str.substr(
      str.length - strPositionEnd,
      str.length
    )}`
  }
  return str
}

const decimalPlaces = (x = 0, decimals = 4) => {
  return new BigNumber(x).decimalPlaces(decimals).toString()
}

export { truncateStringInTheMiddle, decimalPlaces }
