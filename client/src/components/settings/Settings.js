import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import EditProfile from '../profile-forms/EditProfile'

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='settings'>
      <h1 className='large text-primary'>Settings</h1>
      {profile !== null ? (
        <Fragment>
          <EditProfile />
          <div className='my-2'>
            <button
              className='btn btn-danger delete-account-btn'
              onClick={() => deleteAccount()}
            >
              <i className='fas fa-user-minus'>Delete My Account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link
            to='/create-profile'
            className='btn btn-primary my-1 create-profile-btn'
          >
            Create profile
          </Link>
          <div className='my-2'>
            <button
              className='btn btn-danger delete-account-btn'
              onClick={() => deleteAccount()}
            >
              <i className='fas fa-user-minus'>Delete My Account</i>
            </button>
          </div>
        </Fragment>
      )}
    </section>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
)
