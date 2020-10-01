import React, { useState } from 'react';
import { firebase, auth } from '../firebase';

const Auth = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(' ');
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    event.preventDefault();
    const { target: { name, value } } = event;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = input;
    try {
      if (newAccount) {
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      const { message } = error;
      setErrorMessage(message);
    }
  };

  const toggleNewAccount = () => setNewAccount((prev) => !prev);

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
      const { message } = error;
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={onChange}
          value={input.email}
          pattern="^\w+((\.\w+)?)+@\w+.?\w+\.\w+$"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={input.password}
          pattern=".{6,}"
          required
        />
        <input
          type="submit"
          value={newAccount ? 'Sign Up' : 'Sign In'}
        />
        <span onClick={toggleNewAccount} aria-hidden>
          {newAccount ? 'Sign In' : 'Sign Up'}
        </span>
      </form>
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
      {errorMessage}
    </div>
  );
};

export default Auth;
