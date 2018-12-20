import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export class PrivateRoute extends Component {
  render() {
    //   const { component: Component, deploymentStore, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props =>
          this.props.authenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )
  }
}
