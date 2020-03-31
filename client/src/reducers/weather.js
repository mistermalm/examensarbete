import { GET_WEATHER, WEATHER_ERROR } from '../actions/types';

const initialState = {
  weather: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WEATHER:
      return {
        ...state,
        weather: payload,
        loading: false
      };
    case WEATHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
