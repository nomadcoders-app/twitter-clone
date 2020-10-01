import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Profile = () => {
  const history = useHistory();

  const onSignOut = () => {
    auth.signOut();
    history.push('/');
  };

  return (
    <input type="button" value="Sign Out" onClick={onSignOut} />
  );
};

export default Profile;
