import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstraints.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const jwtToken = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  retryProfileDetails = () => {
    this.getProfileDetails()
  }

  renderInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        className="retry-profile-details-button"
        type="button"
        onClick={this.retryProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-details-section">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.inProgress:
        return this.renderInProgressView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileDetails()}</>
  }
}
export default Profile
