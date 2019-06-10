// React apollo
import { ApolloClient } from 'apollo-client'
import { APOLLO_API_URL } from './constants'
import gql from 'graphql-tag'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: APOLLO_API_URL
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export const getTranscoderRewards = async transcoderAddress => {
  const queryResult = await client.query({
    query: gql`
      {
        rewards(where: { transcoder: "${transcoderAddress}" }) {
          rewardTokens
        }
      }
    `
  })
  return queryResult.data && queryResult.data.rewards ? queryResult.data.rewards : null
}

export const getTranscoderTotalStake = async transcoderAddress => {
  const queryResult = await client.query({
    query: gql`
      {
        transcoder(id: "${transcoderAddress}") {
          totalStake
        }
      }
    `
  })
  return queryResult.data && queryResult.data.transcoder && queryResult.data.transcoder.totalStake
    ? queryResult.data.transcoder.totalStake
    : null
}
