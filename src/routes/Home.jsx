import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firestore } from '../firebase';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';

const Home = ({ user }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => firestore.collection('nweets')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      setNweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }), []);

  return (
    <div>
      <NweetFactory user={user} />
      <div>
        {nweets.map(({
          id, text, attachmentUrl, creatorId,
        }) => (
          <Nweet
            key={id}
            id={id}
            text={text}
            attachmentUrl={attachmentUrl}
            isOwner={creatorId === user.uid}
          />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

Home.defaultProps = {
  user: null,
};

export default Home;
