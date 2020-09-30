import React, { useState } from 'react';
import { auth } from '../firebase';
import Router from './Router';

const App = () => {
  const [user, setUser] = useState(auth.currentUser);
  return <Router user={user} />;
};

export default App;
