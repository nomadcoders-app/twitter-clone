import React from 'react';
import PropTypes from 'prop-types';
import { firebase, auth } from '../firebase';

const OAuthForm = ({ errorHandler }) => {
  const onSocialHandler = async (event) => {
    const { target: { name } } = event;
    try {
      let provider;
      if (name === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
      } else if (name === 'github') {
        provider = new firebase.auth.GithubAuthProvider();
      }
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      const { message } = error;
      errorHandler(message);
    }
  };

  return (
    <div>
      <input
        name="google"
        type="button"
        value="Continue with Google"
        onClick={onSocialHandler}
      />
      <input
        name="github"
        type="button"
        value="Continue with Github"
        onClick={onSocialHandler}
      />
    </div>
  );
};

OAuthForm.propTypes = {
  errorHandler: PropTypes.func,
};

OAuthForm.defaultProps = {
  errorHandler: () => {},
};

export default OAuthForm;
