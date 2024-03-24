import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

class Jobs extends Component {
  state = {
    isStatus: true,
    profileDetail: {},
    jobsList: [],
    profileErr: false,
    jobsErr: false,
    searchVal: '',
    packageVal: '',
    employmentVal: '',
  }

  componentDidMount() {
    this.getProfileAndJobs()
  }

  getProfileAndJobs = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {employmentVal, searchVal, packageVal} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentVal}&minimum_package=${packageVal}&search=${searchVal}`
    const jobsRes = await fetch(jobsUrl, options)
    if (jobsRes.ok) {
      const jobsData = await jobsRes.json()
      const jobsArr = jobsData.jobs
      const updatedJobs = jobsArr.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: updatedJobs})
      this.setState({jobsErr: false})
    } else {
      this.setState(old => ({jobsErr: !old.jobsErr}))
    }
    const profileRes = await fetch(profileUrl, options)
    if (profileRes.ok) {
      const profileData = await profileRes.json()
      const profileDetails = profileData.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileDetail: updatedProfileDetails})
      this.setState({profileErr: false})
    } else {
      this.setState(old => ({profileErr: !old.profileErr}))
    }
    this.setState({isStatus: false})
  }

  onRetry = () => {
    this.getProfileAndJobs()
  }

  noJobs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  onSearch = event => {
    this.setState({searchVal: event.target.value})
    this.getProfileAndJobs()
  }

  onEmploymentType = event => {
    const {employmentVal} = this.state
    let updateEmploymentVal = employmentVal
    if (event.target.checked) {
      if (employmentVal.length === 0) {
        updateEmploymentVal += event.target.value
      } else {
        updateEmploymentVal += `${event.target.value},`
      }
      this.setState({employmentVal: updateEmploymentVal})
      this.getProfileAndJobs()
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {history} = this.props
    const {isStatus, profileDetail, jobsList, profileErr, jobsErr} = this.state
    const {name, profileImageUrl, shortBio} = profileDetail
    const jobsLen = jobsList.length
    return (
      <div>
        {jwtToken === undefined ? (
          <Redirect to="/login" />
        ) : (
          <div>
            <Header history={history} />
            <div className="jobsBg">
              <div className="filter-cont">
                <div className="search">
                  <input type="search" placeholder="Search" />
                  <button
                    onClick={this.onSearch}
                    type="button"
                    data-testid="searchButton"
                  >
                    <AiOutlineSearch />
                  </button>
                </div>

                {isStatus ? (
                  <div data-testid="loader">
                    <Loader type="ThreeDots" />
                  </div>
                ) : (
                  <div>
                    {profileErr ? (
                      <div>
                        <button type="button" onClick={this.onRetry}>
                          Retry
                        </button>
                      </div>
                    ) : (
                      <div className="profile-card">
                        <div className="profile-cont">
                          <img
                            src={profileImageUrl}
                            alt="profile"
                            className="profile-img"
                          />
                          <h1>{name}</h1>
                          <p>{shortBio}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <hr />
                <ul>
                  <h1>Type of Employment</h1>
                  <li>
                    <input
                      onChange={this.onEmploymentType}
                      id="FULLTIME"
                      value="FULLTIME"
                      type="checkbox"
                    />
                    <label htmlFor="FULLTIME">Full Time</label>
                  </li>

                  <br />
                  <li>
                    <input
                      onChange={this.onEmploymentType}
                      id="PARTTIME"
                      value="PARTTIME"
                      type="checkbox"
                    />
                    <label htmlFor="PARTTIME">Part Time</label>
                  </li>

                  <br />
                  <li>
                    <input
                      onChange={this.onEmploymentType}
                      id="FREELANCE"
                      value="FREELANCE"
                      type="checkbox"
                    />
                    <label htmlFor="FREELANCE">Freelance</label>
                  </li>

                  <br />
                  <li>
                    <input
                      onChange={this.onEmploymentType}
                      id="INTERNSHIP"
                      value="INTERNSHIP"
                      type="checkbox"
                    />
                    <label htmlFor="INTERNSHIP">Internship</label>
                  </li>

                  <br />
                </ul>
                <hr />
                <ul>
                  <h1>Salary Range</h1>
                  <li>
                    <input name="salary" type="radio" id="10lpa" />
                    <label htmlFor="10lpa">10 LPA and above</label>
                  </li>

                  <li>
                    <input name="salary" type="radio" id="20lpa" />
                    <label htmlFor="20lpa">20 LPA and above</label>
                  </li>
                  <li>
                    <input name="salary" type="radio" id="20lpa" />
                    <label htmlFor="20lpa">20 LPA and above</label>
                  </li>
                  <li>
                    <input name="salary" type="radio" id="30lpa" />
                    <label htmlFor="30lpa">30 LPA and above</label>
                  </li>

                  <li>
                    <input name="salary" type="radio" id="40lpa" />
                    <label htmlFor="40lpa">40 LPA and above</label>
                  </li>

                  <br />
                </ul>
              </div>
              {isStatus ? (
                <div data-testid="loader">
                  <Loader type="ThreeDots" />
                </div>
              ) : (
                <div>
                  {jobsErr ? (
                    <div className="job-err">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                        alt="failure view"
                        className="fail-img"
                      />
                      <h1>Oops! Something Went Wrong</h1>
                      <p>We cannot seem to find the page you are looking for</p>
                      <button type="button" onClick={this.onRetry}>
                        Retry
                      </button>
                    </div>
                  ) : (
                    <div>
                      {jobsLen === 0 ? (
                        this.noJobs()
                      ) : (
                        <ul>
                          {jobsList.map(each => (
                            <JobItem key={each.id} item={each} />
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Jobs
