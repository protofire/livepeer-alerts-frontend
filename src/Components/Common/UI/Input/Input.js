import React from 'react'
import './Input.css'

const input = props => {
  let inputElement = null

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input className="InputElement" {...props.elementConfig} onChange={props.changed} />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea className="InputElement" {...props.elementConfig} onChange={props.changed} />
      )
      break
    default:
      inputElement = (
        <input className="InputElement" {...props.elementConfig} onChange={props.changed} />
      )
      break
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  )
}
export default input
