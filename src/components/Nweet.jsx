import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { firestore, storage } from '../firebase';

const Nweet = ({
  id, text, attachmentUrl, isOwner,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNweet, setNewNweet] = useState('');

  const onDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await firestore.doc(`nweets/${id}`).delete();
      await storage.refFromURL(attachmentUrl).delete();
    }
  };

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
    setNewNweet('');
  };

  const onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await firestore.doc(`nweets/${id}`).update({
      text: newNweet,
    });
    toggleIsEditing();
  };

  const onCancel = () => {
    if (newNweet) {
      const ok = window.confirm('작성 중인 내용이 사라집니다.');
      if (ok) toggleIsEditing();
    } else {
      toggleIsEditing();
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={text}
            value={newNweet}
            onChange={onChange}
          />
          <input type="submit" value="Change" />
          <input type="button" value="Cancel" onClick={onCancel} />
        </form>
      ) : (
        <>
          <h4>{text}</h4>
          {!!attachmentUrl && (
            <img src={attachmentUrl} alt="" width="50px" />
          )}
          {isOwner && (
          <>
            <input type="button" value="Delete Nweet" onClick={onDelete} />
            <input type="button" value="Edit Nweet" onClick={toggleIsEditing} />
          </>
          )}
        </>
      )}

    </div>
  );
};

Nweet.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  attachmentUrl: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default Nweet;
