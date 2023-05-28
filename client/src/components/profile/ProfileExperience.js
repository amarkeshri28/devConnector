import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileExperience = ({
    experience: { title, company, location, from, to, current, description }
}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                {formatDate(from)} - {!current ? formatDate(to) : "Now"}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Location: </strong> {location}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience