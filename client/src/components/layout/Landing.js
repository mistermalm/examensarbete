import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'

const Landing = ({ isAuthenticated, loading, getCurrentProfile }) => {
  useEffect(() => {
    if (isAuthenticated) getCurrentProfile()
  }, [])
  const authLinks = (
    <Fragment>
      <Link to='/settings' className='btn btn-primary'>
        <i className='fas fa-plane' />
        Find Flights
      </Link>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <div className='landing-section'>
        <Link to='/login' className='btn btn-primary'>
          <i className='fas fa-sign-in-alt' /> Login
        </Link>
        <Link to='/register' className='btn btn-secondary'>
          <i className='fas fa-user-plus' /> Register
        </Link>
        <p>Please log in to set up your profile, happy traveling!</p>
      </div>
    </Fragment>
  )

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getCurrentProfile })(Landing)
