import React from 'react'
import styled from 'styled-components'
import CheckboxOff from './img/CheckboxOff'
import CheckboxOn from './img/CheckboxOn'

const CheckboxWrapper = styled.div`
  cursor: pointer;
  position: relative;

  > input {
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 5;
  }

  > svg {
    display: block;
    left: 0;
    position: relative;
    top: 0;
    z-index: 1;
  }
`

const Checkbox = props => {
  const { checked, onChange, ...restProps } = props

  return (
    <CheckboxWrapper {...restProps}>
      {checked ? <CheckboxOn /> : <CheckboxOff />}
      <input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </CheckboxWrapper>
  )
}

export default Checkbox
