import React from 'react'
import styled from 'styled-components'

const TextfieldStyled = styled.input`
  border-bottom: 1px solid ${props => props.theme.textfield.borderColor};
  border-left: none;
  border-right: none;
  border-top: none;
  color: ${props => props.theme.textfield.color};
  font-size: ${props => props.theme.textfield.fontSize};
  font-weight: ${props => props.theme.textfield.fontWeight};
  margin: 0;
  outline: none;
  padding: 7px 5px;

  &::placeholder {
    color: ${props => props.theme.textfield.placeholderColor};
    font-weight: ${props => props.theme.textfield.fontWeight};
  }

  &[disabled] {
    &,
    &:hover {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`

const Textfield = props => {
  return <TextfieldStyled {...props} />
}

export default Textfield
