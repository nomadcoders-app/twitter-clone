import React, { useState } from 'react';
import { auth } from '../firebase';

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
      let userCredential;
      if (newAccount) {
        userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log(userCredential);
      } else {
        userCredential = await auth.signInWithEmailAndPassword(email, password);
      }
      const { user } = userCredential;
    } catch (error) {
      const { message } = error;
      setErrorMessage(message);
    }
  };

  const toggleNewAccount = () => setNewAccount((prev) => !prev);

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
      <input type="button" value="Continue with Google" />
      <input type="button" value="Continue with Github" />
      {errorMessage}
    </div>
  );
};

export default Auth;
