import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

// Exporting the action setAlert and dispatching the data
// The setAlert action takes two parameters (msg, alertType)
export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid.v4()

  // send the type and payload data to the alert reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}
