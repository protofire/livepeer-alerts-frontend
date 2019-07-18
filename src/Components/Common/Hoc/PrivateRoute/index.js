import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { error: rest.error, displayMsg: rest.displayMsg },
            }}
          />
        )
      }
    />
  )
}
export default PrivateRoute
