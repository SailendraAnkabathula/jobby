import './index.css'
import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <div className="home-page">
    <Header />
    <div className="home-details-section">
      <h1 className="home-section-heading">Find The Job That Fits Your Life</h1>
      <p className="home-section-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link-button">
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
