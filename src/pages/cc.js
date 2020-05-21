import React from 'react';

import { Router } from '@reach/router';

import FirebaseContext from '../firebase/FirebaseContext';
import firebaseInit from '../firebase/init';

import AppLayout from '../components/app/AppLayout';
import Signup from '../components/app/Signup';

export default function App() {
  return (
    <FirebaseContext.Provider value={firebaseInit()}>
      <AppLayout>
        <Router basepath="/cc">
          <Signup path="/signup" />
        </Router>
      </AppLayout>
    </FirebaseContext.Provider>
  );
}
