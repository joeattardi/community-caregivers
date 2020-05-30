import React from 'react';

import FirebaseContext from '../firebase/FirebaseContext';
import firebaseInit from '../firebase/init';

import App from '../components/app/App';

export default function AppPage() {
  return (
    <FirebaseContext.Provider value={firebaseInit()}>
      <App />
    </FirebaseContext.Provider>
  );
}
