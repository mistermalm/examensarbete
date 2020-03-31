import React, { useState, useEffect, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import * as moment from 'moment'
import 'moment/locale/sv'

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    airport: '',
    date: ''
  })

  useEffect(() => {
    setFormData({
      airport: loading || !profile.airport ? '' : profile.airport,
      date: loading || !profile.date ? '' : profile.date
    })
    if (!profile) getCurrentProfile()
  }, [getCurrentProfile])

  const { airport } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    createProfile(formData, history, true)
  }

  const setLocale = () => {
    moment.locale('sv')
  }

  return (
    <Fragment>
      {setLocale()}
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <select
            className='select-settings'
            name='airport'
            value={airport}
            onChange={onChange}
          >
            <option value=''>- Select airport -</option>
            <option value='ARN'>Stockholm Arlanda Airport</option>
            <option value='BMA'>Bromma Stockholm Airport</option>
            <option value='GOT'>Göteborg Landvetter Airport</option>
            <option value='MMX'>Malmö Airport</option>
            <option value='LLA'>Luleå Airport</option>
            <option value='UME'>Umeå Airport</option>
            <option value='OSD'>Åre Östersund Airport</option>
            <option value='VBY'>Visby Airport</option>
            <option value='RNB'>Ronneby Airport</option>
            <option value='KRN'>Kiruna Airport</option>
          </select>
        </div>

        <div className='form-group'>
          <select className='select-settings' name='date' onChange={onChange}>
            <option value=''> Select date -</option>
            <option value={moment().format('L')}>Today</option>
            <option
              value={moment()
                .add(1, 'days')
                .format('L')}
            >
              Tomorrow
            </option>
            <option
              value={moment()
                .add(2, 'days')
                .format('L')}
            >
              {moment()
                .add(2, 'days')
                .format('L')}
            </option>
            <option
              value={moment()
                .add(3, 'days')
                .format('L')}
            >
              {moment()
                .add(3, 'days')
                .format('L')}
            </option>
            <option
              value={moment()
                .add(4, 'days')
                .format('L')}
            >
              {moment()
                .add(4, 'days')
                .format('L')}
            </option>
          </select>
        </div>

        <input
          type='submit'
          className='btn btn-primary my-1 save-settings-btn'
          value='Save'
        />
      </form>
      <div className='flights-link'>
        <Link to='/flights' className='btn btn-primary'>
          <i className='fas fa-plane' />
          Flights
        </Link>
      </div>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile
})(withRouter(EditProfile))
