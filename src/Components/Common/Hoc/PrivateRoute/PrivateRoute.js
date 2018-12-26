import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (authenticated ? <Component {...props} /> : <Redirect to="/" />)}
  />
)
export default PrivateRoute
