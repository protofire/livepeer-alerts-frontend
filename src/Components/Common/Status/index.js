import React from 'react'
import styled from 'styled-components'

const StatusStyled = styled.div`
  background-color: ${props => (props.status === 'active' ? '#25e593' : '#de5454')};
  border-radius: 50%;
  height: 10px;
  margin-right: 8px;
  width: 10px;
`

const Status = props => {
  const { status = 'active', ...restProps } = props

  return <StatusStyled status={status} {...restProps} />
}

export default Status
