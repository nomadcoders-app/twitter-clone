import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Router from './Router';

const App = () => {
  const [user, setUser] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => auth.onAuthStateChanged((usr) => {
    try {
      const { uid, email, displayName } = usr;
      setUser({
        uid,
        email,
        displayName,
        async updateProfile(profile) {
          await usr.updateProfile(profile);
        },
      });
    } catch {
      setUser(null);
    } finally {
      setInit(true);
    }
  }), []);

  const refreshUser = () => {
    const usr = auth.currentUser;
    const { uid, email, displayName } = usr;
    setUser({
      uid,
      email,
      displayName,
      async updateProfile(profile) {
        await usr.updateProfile(profile);
      },
    });
  };

  return (
    <>
      {init ? (
        <Router
          user={user}
          refreshUser={refreshUser}
        />
      ) : <div>Initializing...</div>}
      <footer>
        {`© ${new Date().getFullYear()} Nwitter`}
      </footer>
    </>
  );
};

export default App;
