import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebase';

const Profile = ({ user, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState('');

  const getMyNweets = async () => {
    const nweets = await firestore.collection('nweets')
      .where('creatorId', '==', user.uid)
      .orderBy('createdAt')
      .get();
  };

  useEffect(() => {
    // getMyNweets();
  }, []);

  const history = useHistory();

  const onSignOut = () => {
    auth.signOut();
    history.push('/');
  };

  const onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user.displayName !== newDisplayName) {
        await user.updateProfile({ displayName: newDisplayName });
        refreshUser();
        setNewDisplayName('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newDisplayName}
          placeholder={user.displayName}
          onChange={onChange}
        />
        <input type="submit" value="Update profile" />
      </form>
      <input type="button" value="Sign Out" onClick={onSignOut} />
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    updateProfile: PropTypes.func,
  }),
  refreshUser: PropTypes.func,
};

Profile.defaultProps = {
  user: null,
  refreshUser: () => {},
};

export default Profile;
