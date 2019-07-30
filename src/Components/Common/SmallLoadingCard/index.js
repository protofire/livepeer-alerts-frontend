import React from 'react'
import Card from '../Card'
import styled from 'styled-components'
import Spinner from '../Spinner'

const Title = styled.h4`
  align-items: center;
  color: ${props => props.theme.cards.titleColor};
  display: flex;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  line-height: 1.2;
  margin: 0 0 22px;
  padding: 10px 0 0 0;
  text-align: center;
  white-space: nowrap;
`

const SmallLoadingCard = props => {
  const { message = 'Loading...', show = false } = props

  return show ? (
    <Card bodyAlign={'center'}>
      <Title>{message}</Title>
      <Spinner color={'blue'} />
    </Card>
  ) : null
}

export default SmallLoadingCard
