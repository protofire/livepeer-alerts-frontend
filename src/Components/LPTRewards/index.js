import React from 'react'
import Card from '../Common/Card'
import Image from './img/graph.png'

const LPTRewards = props => {
  const { ...restProps } = props

  return (
    <Card title="LPT Rewards" {...restProps}>
      <img src={Image} alt="" />
    </Card>
  )
}

export default LPTRewards
