import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, apiStatus: apiStatusConstraints.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/jobs/${id}`
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
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
        skills: data.job_details.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
      }

      this.setState({
        jobItemDetails: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  onClickRetryButton = () => {
    this.getJobItemDetails()
  }

  renderInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-view-retry-button"
        onClick={this.onClickRetryButton}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      title,
      rating,
      skills,
      similarJobs,
      lifeAtCompany,
    } = jobItemDetails
    return (
      <div className="success-view">
        <div className="job-item-container">
          <div className="job-title-rating-section">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar fill="#fbbf24" size="24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-package">
            <div className="location-job-type">
              <div className="location">
                <MdLocationOn fill="#ffffff" size="18" />
                <p className="job-location">{location}</p>
              </div>
              <div className="job-type">
                <BsBriefcaseFill fill="#f8fafc" size="18" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="visit-link-with-sub-title">
            <h2 className="sub-title">Description</h2>
            <div className="link-container">
              <p className="visit-text">Visit</p>
              <FiExternalLink size="20" color="#6366f1" />
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h3 className="sub-title">Skills</h3>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>

          <h4 className="sub-title">Life at Company</h4>
          <div className="life-at-company-details">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-text">SimilarJobs</h1>
        <ul className="similar-jobs">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsSection = () => {
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
    return (
      <div className="job-item-details-page">
        <Header />
        {this.renderJobDetailsSection()}
      </div>
    )
  }
}
export default JobItemDetails
