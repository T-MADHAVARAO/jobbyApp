import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBagFill} from 'react-icons/bs'
import './index.css'

class JobItem extends Component {
  render() {
    const {item} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = item

    return (
      <Link className="job-card-link" to={`/jobs/${id}`}>
        <li className="job-item">
          <div className="logo-cont">
            <img
              src={companyLogoUrl}
              alt="company logo"
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
            <div className="location-type">
              <div className="location-cont">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="type-cont">
                <BsBagFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }
}

export default JobItem
