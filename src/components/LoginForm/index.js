import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onRenderPasswordInputContainer = () => {
    const {password} = this.state
    return (
      <div className="user-input-container">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="user-input"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  onRenderUsernameInputContainer = () => {
    const {username} = this.state
    return (
      <div className="user-input-container">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="user-input"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <form onSubmit={this.submitForm} className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          {this.onRenderUsernameInputContainer()}
          {this.onRenderPasswordInputContainer()}
          <button type="submit" className="submit-button">
            Login
          </button>
          {showSubmitError && <p className="error-msg-text">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
