import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import './App.css';
import './App.min.css'

/** Redux */
import { Provider } from 'react-redux'
import store from './store'

/** Authentication */
import { loadUser } from './actions/auth'
import setAuthToken from './utilities/setAuthToken'

/** Components */
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    // we wrap everything with provider so that all components can access the states in the  store
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
