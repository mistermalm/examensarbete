import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

// we send in and destructure auth, and also send in logout as a prop
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/flights'>
          <i className='fas fa-plane' />{' '}
          <span className='hide-mobile'>Flights</span>
        </Link>
      </li>
      <li>
        <Link to='/settings'>
          <i className='fas fa-user-cog' />{' '}
          <span className='hide-mobile'>Settings</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-mobile'>Sign Out</span>
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>
          <i className='fas fa-user-plus' />{' '}
          <span className='hide-mobile'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt' />{' '}
          <span className='hide-mobile'>Login</span>
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar bg-dark-opacity'>
      <h1 className='navbar-logo'>
        <Link to='/'>
          <span className='logo-secondary-color'>Wee</span>
          <span className='logo-primary-color'>Find</span>
          <span className='logo-secondary-color'>er</span>
        </Link>
      </h1>
      {/* if not loading and logged in, show authLinks, else show guestLinks*/}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
