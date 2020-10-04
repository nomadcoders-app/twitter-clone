import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navigation = ({ user }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{`${user.displayName}'s Profile`}</Link>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

Navigation.defaultProps = {
  user: null,
};

export default Navigation;
