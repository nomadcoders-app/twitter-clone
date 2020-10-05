import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase';

const AuthForm = ({ errorHandler }) => {
  const [newAccount, setNewAccount] = useState(true);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

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
      console.error(error);
      const { message } = error;
      errorHandler(message);
    }
  };

  const toggleNewAccount = () => setNewAccount((prev) => !prev);

  return (
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
  );
};

AuthForm.propTypes = {
  errorHandler: PropTypes.func,
};

AuthForm.defaultProps = {
  errorHandler: () => {},
};

export default AuthForm;
