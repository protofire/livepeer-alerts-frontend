import logdown from 'logdown'

const logger = logdown('Livepeer:App')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

export default logger
