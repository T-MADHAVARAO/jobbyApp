import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: false}

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onLogIn = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginResponse = await fetch(loginUrl, options)
    const loginData = await loginResponse.json()
    if (loginResponse.ok) {
      Cookies.set('jwt_token', loginData.jwt_token, {expires: 2})
      history.replace('/')
    } else {
      this.setState(old => ({errorMsg: !old.errorMsg}))
      this.setState({errMsgText: loginData.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, errMsgText} = this.state
    return (
      <div className="loginBg">
        <div className="loginCard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.onLogIn}>
            <label htmlFor="userName">USERNAME</label>
            <br />
            <input
              onChange={this.updateUserName}
              type="text"
              placeholder="Username"
              id="userName"
              value={username}
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              onChange={this.updatePassword}
              type="password"
              placeholder="Password"
              id="password"
              value={password}
            />
            <br />
            <button type="submit" className="loginBtn">
              Login
            </button>
            {errorMsg && <p className="error">{errMsgText}</p>}
            <p className="user-cred">
              user credentials : username: rahul ,password : rahul@2021
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
