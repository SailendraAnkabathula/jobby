import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails

  return (
    <li className="job-item-container">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="job-title-rating-section">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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

        <h2 className="sub-title">Description</h2>
        <p className="job-description">{jobDescription}</p>
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
        </div>
      </Link>
    </li>
  )
}
export default SimilarJobs
