import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SearchInput from '../SearchInput'
import FiltersSection from '../FiltersSection'
import JobItem from '../JobItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    searchInput: '',
    employmentTypes: [],
    jobsList: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const {searchInput, employmentTypes, activeSalaryRangeId} = this.state
    const employmentType = employmentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    console.log(url)
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  onEnterKeyPressed = () => {
    this.getJobsList()
  }

  onChangeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onChangeActiveSalaryRangeId = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsList)
  }

  onAddEmploymentType = employmentId => {
    const {employmentTypes} = this.state
    const isIncluded = employmentTypes.includes(employmentId)
    if (isIncluded === true) {
      const updatedList = employmentTypes.filter(
        eachId => eachId !== employmentId,
      )
      this.setState({employmentTypes: updatedList}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({
          employmentTypes: [...prevState.employmentTypes, employmentId],
        }),
        this.getJobsList,
      )
    }
  }

  onClickRetryButton = () => {
    this.getJobsList()
  }

  renderInFailureView = () => (
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

  renderInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    const shouldShowJobListView = jobsList.length > 0
    return (
      <div className="success-view-container">
        {shouldShowJobListView ? (
          <ul className="jobs-list">
            {jobsList.map(eachJobItem => (
              <JobItem key={eachJobItem.id} jobItemDetails={eachJobItem} />
            ))}
          </ul>
        ) : (
          <div className="no-job-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure-view-image"
            />
            <h1 className="failure-view-title">No Jobs Found</h1>
            <p className="failure-view-description">
              We could not found any jobs. Try other filters.
            </p>
          </div>
        )}
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.inProgress:
        return this.renderInProgressView()
      case apiStatusConstraints.failure:
        return this.renderInFailureView()
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, activeSalaryRangeId, employmentTypes} = this.state
    return (
      <div className="jobs-page">
        <Header />
        <div className="jobs-section">
          <div className="filter-section">
            <div className="mobile-view-search-input-container">
              <SearchInput
                searchInputText={searchInput}
                onChangeSearchInput={this.onChangeSearchInput}
                onEnterKeyPressed={this.onEnterKeyPressed}
              />
            </div>
            <FiltersSection
              employmentTypesList={employmentTypesList}
              employmentTypes={employmentTypes}
              salaryRangesList={salaryRangesList}
              onAddEmploymentType={this.onAddEmploymentType}
              onChangeActiveSalaryRangeId={this.onChangeActiveSalaryRangeId}
              activeSalaryRangeId={activeSalaryRangeId}
            />
          </div>
          <div className="jobs-list-container">
            <div className="desktop-view-search-input">
              <SearchInput
                searchInputText={searchInput}
                onChangeSearchInput={this.onChangeSearchInput}
                onEnterKeyPressed={this.onEnterKeyPressed}
              />
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
