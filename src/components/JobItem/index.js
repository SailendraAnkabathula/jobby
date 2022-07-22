import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = jobItemDetails

  return (
    <li className="job-item-container">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="job-title-rating-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h2 className="sub-title">Description</h2>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
