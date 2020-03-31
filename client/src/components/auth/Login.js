import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

// destructuring login, so we don't have to type "props.login"
const Login = ({ login, isAuthenticated }) => {
  //formData is the state, and setFormData is a function, we pull those out from the useState hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // pulling out those variables from the formData state
  const { email, password } = formData

  // what will happen when we change a value in a input field
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  // what will happen when we submit the form
  const onSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <section className='login'>
      <h1 className='large text-primary'>Login</h1>
      <form className='form' onSubmit={onSubmit}>
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
            minLength='6'
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary login-btn'
          value='Login'
        />
      </form>
      <p className='my-1'>
        Do not have an account? <Link to='/register'>Register</Link>
      </p>
    </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

// mapping the redux state to a prop
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
