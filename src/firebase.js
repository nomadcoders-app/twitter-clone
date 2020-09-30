import firebase from 'firebase/app';
import 'firebase/auth';

// React에서 env를 사용할 때 이름은 REACT_APP으로 시작해야 한다.
// 아래 API key는 github으로부터 숨긴 것 뿐 빌드 시 사용자들에게 공개될 수 있다.
// 특정 도메인에서만 사용할 수 있도록 하는 등 보안을 강화할 수 있다.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const instance = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
