import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBagFill} from 'react-icons/bs'
import './index.css'

class SimilarJobCard extends Component {
  render() {
    const {similarJobDetails} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      jobDescription,
      location,
      employmentType,
      id,
    } = similarJobDetails

    return (
      <Link className="job-card-link" to={`/jobs/${id}`}>
        <li className="job-item">
          <div className="logo-cont">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
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

          <hr />
          <div>
            <h4>Description</h4>
            <p>{jobDescription}</p>
          </div>
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
        </li>
      </Link>
    )
  }
}

export default SimilarJobCard
