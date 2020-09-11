import React from 'react'
import PropTypes from 'prop-types'

function Profile({ user }) {
    return (
        <div>
            <h1>Profile Component</h1>
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Profile;

