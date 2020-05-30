import React from 'react';

import { Router } from '@reach/router';

import FirebaseContext from '../firebase/FirebaseContext';
import firebaseInit from '../firebase/init';

import AppLayout from '../components/app/AppLayout';
import Home from '../components/app/Home';
import Login from '../components/app/Login';
import Signup from '../components/app/Signup';
import SignupConfirm from '../components/app/SignupConfirm';

export default function App() {
  return (
    <FirebaseContext.Provider value={firebaseInit()}>
      <AppLayout>
        <Router basepath="/cc">
          <Login path="/login" />
          <Signup path="/signup" />
          <SignupConfirm path="/thankyou" />
          <Home path="/" />
        </Router>
      </AppLayout>
    </FirebaseContext.Provider>
  );
}
