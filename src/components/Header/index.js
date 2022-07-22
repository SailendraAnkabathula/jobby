import './index.css'
import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogoutButtonClicked = () => {
    const {history} = props
    Cookies.remove('jwtToken')

    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="mobile-view">
        <div className="mobile-view-logo-container">
          <Link to="/" className="link-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo-mobile"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="menu-list-mobile-view">
          <li className="item">
            <Link to="/" className="link-item">
              <AiFillHome size="24" fill="#f8fafc" />
            </Link>
          </li>
          <li className="item">
            <Link to="/jobs" className="link-item">
              <BsBriefcaseFill size="24" fill="#f8fafc" />
            </Link>
          </li>
        </ul>
        <button
          onClick={onLogoutButtonClicked}
          type="button"
          className="logout-button"
        >
          <FiLogOut size="24" color="#f8fafc" />
        </button>
      </div>

      <div className="desktop-view">
        <div className="desktop-view-logo-container">
          <Link to="/" className="link-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo-desktop"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="menu-list-desktop-view">
          <li className="item">
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>
          <li className="item">
            <Link to="/jobs" className="link-item">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          onClick={onLogoutButtonClicked}
          type="button"
          className="logout-button-desktop"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
