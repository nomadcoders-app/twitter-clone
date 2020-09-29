import React from 'react';
import ReactDOM from 'react-dom';
import firebaseConfig from './firebase';
import firebase from 'firebase/app';
import App from './App';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
