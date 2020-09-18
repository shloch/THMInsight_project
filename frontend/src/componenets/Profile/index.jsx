import React from 'react';
import PropTypes from 'prop-types';

function Profile({ user }) {
  return (
    <div>
      <h1>Profile Component</h1>
      <h2>
        email:
        {user.email}
      </h2>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};
Profile.defaultProps = {
  user: { email: 'undefined@' },
};

export default Profile;
