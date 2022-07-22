import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', shouldShowErrorMsg: false}

  onLoginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwtToken', token, {expires: 30})

    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({errorMsg, shouldShowErrorMsg: true})
  }

  onSubmitButtonClicked = async event => {
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
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
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

  render() {
    const {errorMsg, shouldShowErrorMsg} = this.state
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <form
          onSubmit={this.onSubmitButtonClicked}
          className="login-form-container"
        >
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
          {shouldShowErrorMsg && <p className="error-msg-text">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
