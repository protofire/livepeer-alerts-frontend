import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

/*
export class PrivateRoute extends Component {
  render() {
    //   const { component: Component, deploymentStore, ...props } = this.props;
    console.log("[PrivateRoute.js] props: ", this.props)
    return (
      <Route
        {...this.props}
        render={props =>
          this.props.authenticated ? <Component {...this.props} /> : <Redirect to="/" />
        }
      />
    )
  }
}
*/

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (authenticated ? <Component {...props} /> : <Redirect to="/" />)}
  />
)
export default PrivateRoute;