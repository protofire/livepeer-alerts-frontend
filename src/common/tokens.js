export const tokenAmountInUnits = (amount, decimals = 18) => {
  const decimalsPerToken = Math.pow(10, decimals)
  return amount / decimalsPerToken
}
