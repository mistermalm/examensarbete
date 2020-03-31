import axios from 'axios';
import { GET_FLIGHTS, FLIGHTS_ERROR } from './types';

/** GET FLIGHTS BY AIRPORT */
export const getFlightsByAirport = (airport, date) => async dispatch => {
  try {
    const response = await axios.get(
      `/api/flights/departures/${airport}/${date}`
    );
    dispatch({
      type: GET_FLIGHTS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: FLIGHTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
