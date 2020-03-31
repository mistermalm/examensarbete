import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Settings from '../settings/Settings'
import EditProfile from '../profile-forms/EditProfile'
import CreateProfile from '../profile-forms/CreateProfile'
import Flights from '../flights/Flights'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/login' component={Login}></Route>
        <PrivateRoute exact path='/flights' component={Flights}></PrivateRoute>
        <PrivateRoute exact path='/settings' component={Settings} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}
export default Routes
