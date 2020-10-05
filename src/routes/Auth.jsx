import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import OAuthForm from '../components/OAuthForm';

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState(' ');

  return (
    <>
      <div>
        <AuthForm errorHandler={setErrorMessage} />
        <OAuthForm errorHandler={setErrorMessage} />
      </div>
      <span>{errorMessage}</span>
    </>
  );
};

export default Auth;
