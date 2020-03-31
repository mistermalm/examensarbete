import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

// props are sent in here...
// ...we are destructuring props therefor we don't have to use "props." anymore
const Register = ({ setAlert, register, isAuthenticated }) => {
  //formData is the state, and setFormData is a function, we pull those out from the useState hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  // pulling out those variables from the formData state
  const { name, email, password, password2 } = formData

  // what will happen when we change a value in a input field
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  // what will happen when we submit the form
  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      //calls the action setAlert that takes a "msg" and a "alertType" as parameter, this was defined in actions/alert.js
      setAlert('Passwords do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  // Redirect if register success
  if (isAuthenticated) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <section className='register'>
      <h1 className='large text-primary'>Register</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            className='name'
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            className='email'
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            className='password'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            className='password'
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary register-btn'
          value='Register'
        />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

// mapping the redux state to a prop
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

// connect takes in whatever state we want to map, and the action we want to use, in this case "props.setAlert"
export default connect(mapStateToProps, { setAlert, register })(Register)
