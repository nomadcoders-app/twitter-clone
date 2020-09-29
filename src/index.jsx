import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import firebaseConfig from './firebase';
import App from './components/App';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
