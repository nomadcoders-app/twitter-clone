import React from 'react';
import PropTypes from 'prop-types';

const Nweet = ({ text }) => (
  <div>
    <h4>{text}</h4>
  </div>
);

Nweet.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Nweet;
