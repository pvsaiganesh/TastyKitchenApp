import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', err: '', userErrMsg: '', passErrMsg: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  userRenderError = event => {
    if (event.target.value === '') {
      this.setState({userErrMsg: '*Required'})
    } else {
      this.setState({userErrMsg: ''})
    }
  }

  passRenderError = event => {
    if (event.target.value === '') {
      this.setState({passErrMsg: '*Required'})
    } else {
      this.setState({passErrMsg: ''})
    }
  }

  submitData = async () => {
    const {username, password} = this.state
    const {history} = this.props
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      this.setState({err: data.error_msg})
    }
  }

  render() {
    const {userErrMsg, passErrMsg, err} = this.state
    const jwtToken = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg">
        <div className="bg-part-1">
          <div className="sign-in-box">
            <div className="logo-container">
              <img
                className="logo-home-page-1"
                src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1625840298/Frame_274_ttugae.jpg"
                alt="home-page-logo"
              />
              <img
                className="logo-home-page-2"
                src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1625840298/Features_imb8ah.jpg"
                alt="home-page-logo"
              />
            </div>
            <h1 className="sign-in-heading">Sign In</h1>
            <div className="input-box-container">
              <div className="input-box mb">
                <label className="input-box-label" htmlFor="user">
                  USERNAME
                </label>
                <input
                  placeholder="Sai"
                  onBlur={this.userRenderError}
                  onChange={this.getUsername}
                  className="input-box-home-page"
                  type="text"
                  id="user"
                />
                <p className="err">{userErrMsg}</p>
              </div>
              <div className="input-box mb">
                <label className="input-box-label" htmlFor="pass">
                  PASSWORD
                </label>
                <input
                  onBlur={this.passRenderError}
                  onChange={this.getPassword}
                  className="input-box-home-page"
                  type="password"
                  id="pass"
                />
                <p className="err">{passErrMsg}</p>
              </div>
              <button
                onClick={this.submitData}
                className="button-home-page"
                type="button"
              >
                Sign In
              </button>
              <p className="err"> {err}</p>
            </div>
          </div>
        </div>
        <img
          className="bg-part-2"
          src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1625840304/Rectangle_1456_noktu4.jpg"
          alt="home-page-img"
        />
      </div>
    )
  }
}
export default Login
