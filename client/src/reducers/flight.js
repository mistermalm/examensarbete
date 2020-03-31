import { GET_FLIGHTS, FLIGHTS_ERROR } from '../actions/types';

const initialState = {
  departures: [],
  flight: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FLIGHTS:
      return {
        ...state,
        departures: payload,
        loading: false
      };
    case FLIGHTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
