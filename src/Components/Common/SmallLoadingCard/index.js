import React from 'react'
import Card from '../Card'
import styled, { withTheme } from 'styled-components'
import Spinner from '../Spinner'

const CenteredContentsCard = styled(Card)`
  min-height: 157px;

  > div {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`

const Title = styled.h4`
  color: ${props => props.theme.cards.titleColor};
  font-size: 17px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 15px;
  padding: 0;
  text-align: center;
  white-space: nowrap;
`

const SmallLoadingCard = props => {
  const { message = 'Loading...', show = false, theme } = props

  return show ? (
    <CenteredContentsCard bodyAlign={'center'}>
      <Title>{message}</Title>
      <Spinner color={theme.colors.primary} />
    </CenteredContentsCard>
  ) : null
}

export default withTheme(SmallLoadingCard)
