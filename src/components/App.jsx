import React, { useState } from 'react';
import Router from './Router';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return <Router isSignedIn={isSignedIn} />;
};

export default App;
