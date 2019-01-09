import React from 'react'
import './Spinner.css'
const spinner = props => (
  <>
    <h3>{props.displayMsg}</h3>
    <div className="Loader">Loading...</div>
  </>
)
export default spinner
