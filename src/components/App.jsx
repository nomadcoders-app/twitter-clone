import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Router from './Router';

const App = () => {
  const [user, setUser] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    // user의 상태 변환에 따른 이벤트를 정의한다.
    auth.onAuthStateChanged((usr) => {
      const { uid, email, displayName } = usr;
      setUser({
        uid,
        email,
        displayName,
        async updateProfile(profile) {
          await usr.updateProfile(profile);
        },
      });
      setInit(true);
    });
  }, []);

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
