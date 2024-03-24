import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  gotoJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {history} = this.props
    return (
      <div>
        {jwtToken === undefined ? (
          <Redirect to="/login" />
        ) : (
          <div className="bg">
            <Header history={history} />
            <h1>Find The Job That Fits Your Life</h1>

            <div className="homeBg">
              <p>
                Millions of people are searching for jobs,salary
                information,company reviews.Find the job that fits your
                abilities and potential
              </p>
              <Link to="/jobs">
                <button
                  className="findBtn"
                  type="button"
                  onClick={this.gotoJobs}
                >
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Home
