import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// destructuring the component, and take in any other props that is passed in
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  // check if user is not authenticated and not loading
  // if so, then redirect to login page
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

// define props
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// redux state
const mapStateToProps = state => ({
  auth: state.auth
});

// connects redux state with the component before its exported
export default connect(mapStateToProps)(PrivateRoute);
