import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-cont">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website logo"
          />
        </Link>
        <div className="btns">
          <Link to="/">
            <AiFillHome />
          </Link>
          <Link to="/jobs">
            <BsFillBagFill />
          </Link>

          <button type="button" onClick={this.logOut}>
            <FiLogOut />
          </button>
        </div>
        <ul className="large">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>jobs</li>
          </Link>
          <Link to="/login">
            <li>
              <button type="button" onClick={this.logOut}>
                Logout
              </button>
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}

export default Header
