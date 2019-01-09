import React from 'react'
import './Button.css'
const button = props => {
  return (
    <button disabled={props.disabled} className="Button" onClick={props.clicked}>
      {props.children}
    </button>
  )
}
export default button
