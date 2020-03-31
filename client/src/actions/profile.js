import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types'

/** GET THE CURRENT USERS PROFILE */
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE })

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

/**
 * CREATE OR UPDATE A PROFILE
 *
 * Takes in the user input(formData), history object
 * and edit with false as default
 *
 */
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Settings Updated' : 'Settings Saved', 'success'))

    if (!edit) {
      history.push('/')
    }
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

/** DELETE Account & Profile
 *
 * no parameter, will know what account from token
 */
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? Deleting your account can NOT be undone!'))
    try {
      await axios.delete('/api/profile/')

      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch(setAlert('Your Account has been permanently deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
}
