import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileEducation = ({
    education: { school, degree, fieldofstudy, from, to, current, description }
}) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                {formatDate(from)} - {!current ? formatDate(to) : 'Now'}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                <strong>Field Of Study: </strong> {fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation