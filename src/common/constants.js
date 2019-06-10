export const AXIOS_BASE_URL =
  process.env.REACT_APP_API_BASE_URL | 'http://localhost:4040/api/subscribers/'
export const GOOGLE_ANALYTICS_URL = process.env.REACT_APP_GOOGLE_ANALYTICS_UID
export const LOGGER_ENABLED = process.env.NODE_ENV !== 'production'
export const TELEGRAM_URL =
  process.env.REACT_APP_LIVEPEER_TELEGRAM_BOT_URL | 'https://t.me/LivepeerNotificationBot'
export const APOLLO_API_URL = 'https://api.thegraph.com/subgraphs/name/graphprotocol/livepeer'
