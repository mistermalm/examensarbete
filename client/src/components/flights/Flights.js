import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Geocode from 'react-geocode'

/** Redux */
import { connect } from 'react-redux'

/** Actions */
import { getFlightsByAirport } from '../../actions/flight'
import { getCurrentProfile } from '../../actions/profile'

/** Components */
import Spinner from '../layout/Spinner'
import WeatherContainer from '../weatherContainer/WeatherContainer'

/** Function */
const Flights = ({
  flight: {
    departures: { flights },
    loading
  },
  profile: { profile },
  getFlightsByAirport,
  getCurrentProfile
}) => {
  const [state, setState] = useState({ locations: [], loading: true })
  const locs = []
  let count = 0

  const geocoder = flights => {
    // move to another file
    Geocode.setApiKey('AIzaSyDoqVNH9-xDifgFalfWi5lCQ9n2B9WDETA')
    for (let i = 0; i < flights.length; i++) {
      count++
      Geocode.fromAddress(`${flights[i].departure.arrivalAirportEnglish}`).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location
          locs.push({
            city: flights[i].departure.arrivalAirportEnglish,
            lat: lat,
            lon: lng,
            flightId: flights[i].departure.flightId,
            flightDate:
              flights[i].departure.flightLegIdentifier.flightDepartureDateUtc
          })

          // check if push is finished. then setState
          if (locs.length == flights.length) {
            setState({ locations: locs, loading: false })
          }
        },
        error => {
          console.error(error)
        }
      )
    }
  }

  useEffect(() => {
    if (profile) {
      getFlightsByAirport(profile.airport, profile.date)
    } // need to fix date to not being hard coded, build a date picker...
    if (!profile) getCurrentProfile()
  }, [profile])

  useEffect(() => {
    if (flights) {
      geocoder(flights)
    }
  }, [flights])
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {flights.length > 0 && state.loading == false ? (
            state.locations.map((location, index) => (
              <Fragment key={index}>
                <WeatherContainer location={location} />
              </Fragment>
            ))
          ) : (
            <h4>No weather found...</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

/** Prop types */
Flights.propTypes = {
  flight: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getFlightsByAirport: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

/** Redux states */
const mapStateToProps = state => ({
  flight: state.flight,
  profile: state.profile
})

/** Export */
export default connect(mapStateToProps, {
  getFlightsByAirport,
  getCurrentProfile
})(Flights)
