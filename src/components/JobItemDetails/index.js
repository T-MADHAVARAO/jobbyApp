import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBagFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], isLoading: true, isFail: false}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updateData
      const updateJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        rating: jobDetails.rating,
        packagePerAnnum: jobDetails.package_per_annum,
        title: jobDetails.title,
      }
      this.setState({jobDetails: updateJobDetails})
      const updateSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({similarJobs: updateSimilarJobs})
    } else {
      this.setState(old => ({isFail: !old.isFail}))
    }
    this.setState(old => ({isLoading: !old.isLoading}))
  }

  onRetryJob = () => {
    this.getProductDetails()
  }

  render() {
    const {history} = this.props
    const {jobDetails, similarJobs, isLoading, isFail} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobDetails
    let companyLife
    if (lifeAtCompany !== undefined) {
      companyLife = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
    } else {
      companyLife = null
    }
    const jwtToken = Cookies.get('jwt_token')
    return (
      <div>
        {jwtToken === undefined ? (
          <Redirect to="/login" />
        ) : (
          <div>
            {isLoading ? (
              <div data-testid="loader">
                <Loader type="ThreeDots" />
              </div>
            ) : (
              <div>
                {isFail ? (
                  <div className="job-err">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                      alt="failure view"
                      className="fail-img"
                    />
                    <h1>Oops! Something Went Wrong</h1>
                    <p>We cannot seem to find the page you are looking for</p>
                    <button type="button" onClick={this.onRetryJob}>
                      Retry
                    </button>
                  </div>
                ) : (
                  <div>
                    <Header history={history} />
                    <div className="job-details">
                      <div className="job-item">
                        <div className="logo-cont">
                          <img
                            src={companyLogoUrl}
                            alt="job details company logo"
                            className="company-logo"
                          />
                          <div>
                            <h3 className="title">{title}</h3>
                            <div className="rating">
                              <AiFillStar />
                              <p className="rate">{rating}</p>
                            </div>
                          </div>
                        </div>
                        <div className="location-type-salary">
                          <ul className="location-type">
                            <li className="location-cont">
                              <MdLocationOn />
                              <p>{location}</p>
                            </li>
                            <li className="type-cont">
                              <BsBagFill />
                              <p>{employmentType}</p>
                            </li>
                          </ul>
                          <p>{packagePerAnnum}</p>
                        </div>
                        <hr />
                        <div>
                          <div className="link-cont">
                            <h1>Description</h1>
                            <a href={companyWebsiteUrl} className="link">
                              <p>Visit</p>
                              <FiExternalLink />
                            </a>
                          </div>
                          <p>{jobDescription}</p>
                        </div>
                        <div>
                          <h1>Skills</h1>
                          <ul className="skill-cont">
                            {skills !== undefined &&
                              skills.map(eachItem => (
                                <li key={eachItem.name} className="skill-item">
                                  <img
                                    src={eachItem.imageUrl}
                                    alt={eachItem.name}
                                    className="skill-img"
                                  />
                                  <h3>{eachItem.name}</h3>
                                </li>
                              ))}
                          </ul>
                        </div>
                        {companyLife !== null && (
                          <div>
                            <h1>Life at Company</h1>
                            <p>{companyLife.description}</p>
                            <img
                              src={companyLife.imageUrl}
                              alt="life at company"
                              className="company-life"
                            />
                          </div>
                        )}
                      </div>
                      <h1>Similar Jobs</h1>
                      <ul>
                        {similarJobs.map(each => (
                          <SimilarJobCard
                            key={each.id}
                            similarJobDetails={each}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default JobItemDetails
