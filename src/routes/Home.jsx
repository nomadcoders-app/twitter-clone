import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firestore } from '../firebase';
import Nweet from '../components/Nweet';

const Home = ({ user }) => {
  const MAX_LENGTH = 120;
  const [content, setContent] = useState('');
  const [nweets, setNweets] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    firestore.collection('nweets').onSnapshot((snapshot) => {
      setNweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    setContent(value);
    setLength(value.length);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setContent('');
    const data = await firestore.collection('nweets').add({
      text: content,
      creatorId: user.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          type="text"
          value={content}
          placeholder="What's on your mind?"
          maxLength={MAX_LENGTH}
          onChange={onChange}
        />
        <span>{`${length}/${MAX_LENGTH}`}</span>
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(({ id, text }) => (
          <Nweet key={id} text={text} />
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
