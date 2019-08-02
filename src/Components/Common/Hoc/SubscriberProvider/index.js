import React, { Component } from 'react'
import logdown from 'logdown'
import axios from 'axios'
import * as displayTexts from '../../../../Texts/AccountSummary'

const logger = logdown('Livepeer:Web3Provider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const defaultState = {
  subscriberData: {
    loadingSubscriberData: false,
    email: null,
    emailFrequency: null,
    telegramFrequency: null,
    telegramChatId: null,
    activated: 1,
    lastEmailSent: null,
    lastTelegramSent: null,
    _id: '',
    address: '',
    activatedCode: '',
    createdAt: '',
    isSubscribed: false,
  },
  summary: {
    loadingSummary: false,
    role: '',
    lpBalance: '',
    delegator: {
      address: '',
      allowance: '0',
      bondedAmount: '0',
      delegateAddress: '',
      delegatedAmount: '0',
      fees: '0',
      lastClaimRound: '0',
      pendingFees: '0',
      pendingStake: '0',
      startRound: '0',
      status: '',
      withdrawRound: '0',
      withdrawAmount: '0',
      nextUnbondingLockId: '0',
      totalStake: '0',
      delegateCalledReward: false,
      totalStakeInLPT: '0',
      bondedAmountInLPT: '0',
    },
    delegate: {
      active: true,
      address: '',
      feeShare: '',
      lastRewardRound: '',
      pricePerSegment: '',
      pendingRewardCut: '',
      pendingFeeShare: '',
      pendingPricePerSegment: '',
      rewardCut: '',
      status: '',
      totalStake: '',
      delegateCalledReward: false,
      totalStakeInLPT: '',
    },
  },
  earnedRewardData: null,
  myDelegateData: null,
  displayMsg: displayTexts.LOADING_USER_DATA,
}

const SubscriberContext = React.createContext({
  state: defaultState,
})

export const SubscriberContextConsumer = SubscriberContext.Consumer

class SubscriberProvider extends Component {
  state = {
    ...defaultState,
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    logger.log('Fire event componentWillReceiveProps')
    const { subscriberAddress } = this.props
    const propsChanged = subscriberAddress !== nextProps.subscriberAddress
    if (propsChanged) {
      await this.loadSubscriberProvider(subscriberAddress)
    }
  }

  async componentDidMount() {
    logger.log('Fire event componentDidMount')
    const { subscriberAddress } = this.props
    await this.loadSubscriberProvider(subscriberAddress)
  }

  loadSubscriberProvider = async subscriberAddress => {
    logger.log(`[SubscriberProvider] - Loading subscriber provider for address: ${subscriberAddress}`)
    await this.setStateAsync({
      ...this.state,
      subscriberAddress,
    })

    this.setState({
      subscriberData: {
        ...this.state.subscriberData,
        loadingSubscriberData: true,
      },
      summary: {
        ...this.state.summary,
        loadingSummary: true,
      },
      earnedRewardData: {
        ...this.state.earnedRewardData,
        loadingEarnedRewardData: true,
      },
      myDelegateData: {
        ...this.state.myDelegateData,
        loadingMyDelegateData: true,
      },
    })
    // Loads subscriber data, account summary data
    await Promise.all([
      this.loadSubscriberData(subscriberAddress),
      this.fetchAccountSummaryData(subscriberAddress),
      this.loadEarnedRewardData(subscriberAddress),
    ])

    // Needs to await loadSubscriberData finish properly
    await this.loadMyDelegateData()

    logger.log('[SubscriberProvider] - Loading subscriber provider finished')
  }

  setStateAsync = state => {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
  }

  loadSubscriberData = async subscriberAddress => {
    try {
      await this.setStateAsync({
        ...this.state,
      })
      logger.log('[SubscriberProvider] - Retrieving subscription for address ', subscriberAddress)
      let userData = await axios.get(`/subscribers/address/${subscriberAddress}`)
      await this.updateSubscriberData({
        isSubscribed: true,
        id: userData.data._id,
        ...userData.data,
      })
      return this.state
    } catch (error) {
      // Subscription not found
      if (error.response && error.response.status === 404) {
        logger.log('[SubscriberProvider] - Subscription not found for ', subscriberAddress)
        await this.setStateAsync({
          ...this.state,
          isSubscribed: false,
        })
        return this.state
      } else {
        // Another network problem
        logger.error('[SubscriberProvider] - error on loadSubscriberData(): ', error)
      }
    } finally {
      this.setState({
        subscriberData: {
          ...this.state.subscriberData,
          loadingSubscriberData: false,
        },
      })
    }
  }

  updateSubscriberData = subscriberData => {
    if (!subscriberData) {
      logger.error('Missing subscription data on updateSubscriberData(), skipping')
      return
    }
    this.setStateAsync({
      subscriberData: {
        ...this.state.subscriberData,
        ...subscriberData,
      },
    })
  }

  unsubscribeUser = async () => {
    const { subscriberData } = this.state
    logger.log('Unsubscribing user with id ', subscriberData)
    await axios.delete(`/subscribers/${subscriberData.id}`)
    this.updateSubscriberData({
      ...defaultState.subscriberData,
    })
  }

  subscriberUser = async subscriptionData => {
    if (!subscriptionData) {
      logger.error('Missing subscription data on subscriberUser(), skipping')
      return
    }
    try {
      logger.log('Creating new subscriber with data: ', subscriptionData)
      const response = await axios.post('/subscribers', subscriptionData)
      const { activated, _id, activatedCode, createdAt } = response.data
      this.updateSubscriberData({
        activated,
        id: _id,
        activatedCode: activatedCode,
        createdAt: createdAt,
        isSubscribed: true,
      })
    } catch (exception) {
      logger.log('Exception on postSubscription')
      let responseMsg = exception.response.data.message
      let displayMsg
      // Email already exists
      if (
        (responseMsg && responseMsg === displayTexts.FAIL_EMAIL_ALREADY_EXISTS_RESPONSE) ||
        exception.response.status === 422
      ) {
        displayMsg = displayTexts.EMAIL_ALREADY_EXISTS
      } else {
        displayMsg = displayTexts.FAIL_NO_REASON
      }
      exception.displayMsg = displayMsg
      throw exception
    }
  }

  updateUserSubscription = async subscriptionData => {
    try {
      logger.log('Updating subscriber with data: ', subscriptionData)
      const subscriberId = subscriptionData.id
      await axios.put(`/subscribers/${subscriberId}`, subscriptionData)
    } catch (err) {
      logger.log('Exception on updateUserSubscription')
      throw err
    }
  }

  fetchAccountSummaryData = async subscriberAddress => {
    try {
      let summaryData = await axios.get(`/subscribers/summary/${subscriberAddress}`)
      this.setStateAsync({
        summary: {
          loadingSummary: false,
          role: summaryData.data.role,
          lpBalance: summaryData.data.balance,
          delegate: summaryData.data.transcoder ? { ...summaryData.data.transcoder } : null,
          delegator: summaryData.data.delegator ? { ...summaryData.data.delegator } : null,
        },
      })
    } catch (exception) {
      logger.error('[SubscriberProvider] - error on fetchAccountSummaryData(): ', exception)
    }
  }

  loadEarnedRewardData = async subscriberAddress => {
    try {
      await this.setStateAsync({
        ...this.state,
      })
      logger.log('[SubscriberProvider] - Retrieving earned rewards for address ', subscriberAddress)
      const { data } = await axios.get(`/delegators/last-rewards/${subscriberAddress}`)
      const earnedRewardData = data && data.summary
      await this.setStateAsync({
        earnedRewardData: {
          ...earnedRewardData,
        },
      })
      return this.state
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Earned reward not found
        logger.log('[SubscriberProvider] - Earned reward not found for ', subscriberAddress)
      } else {
        // Another network problem
        logger.error('[SubscriberProvider] - error on loadEarnedRewards(): ', error)
      }
    } finally {
      this.setState({
        earnedRewardData: {
          ...this.state.earnedRewardData,
          loadingEarnedRewardData: false,
        },
      })
    }
  }

  loadMyDelegateData = async () => {
    const delegateAddress =
      this.state.summary && this.state.summary.delegator && this.state.summary.delegator.delegateAddress
    try {
      await this.setStateAsync({
        ...this.state,
      })

      logger.log('[SubscriberProvider] - Retrieving my delegate data for address ', delegateAddress)
      const { data } = await axios.get(`/delegates/reward-status/${delegateAddress}`)
      const myDelegateData = data && data.summary

      await this.setStateAsync({
        myDelegateData: {
          ...myDelegateData,
        },
      })

      return this.state
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Earned reward not found
        logger.log('[SubscriberProvider] - My delegate data not found for ', delegateAddress)
      } else {
        // Another network problem
        logger.error('[SubscriberProvider] - error on loadMyDelegateData(): ', error)
      }
    } finally {
      this.setState({
        myDelegateData: {
          ...this.state.myDelegateData,
          loadingMyDelegateData: false,
        },
      })
    }
  }

  render = () => {
    const content = (
      <SubscriberContext.Provider
        value={{
          subscriberData: this.state.subscriberData,
          summaryData: this.state.summary,
          earnedRewardData: this.state.earnedRewardData,
          myDelegateData: this.state.myDelegateData,
          unsubscribeUser: this.unsubscribeUser,
          subscriberUser: this.subscriberUser,
          updateUserSubscription: this.updateUserSubscription,
        }}
      >
        {this.props.children}
      </SubscriberContext.Provider>
    )
    return content
  }
}

export default SubscriberProvider
