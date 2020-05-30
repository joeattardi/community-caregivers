import React, { useContext } from 'react';

import { Router } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';

import FirebaseContext from '../../firebase/FirebaseContext';
import UserContext from './UserContext';

import AppLayout from './AppLayout';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import SignupConfirm from './SignupConfirm';

import styles from './App.module.scss';

export default function App() {
  const firebaseRef = useContext(FirebaseContext);
  const [user, isLoadingUser] = useAuthState(firebaseRef.auth());

  if (isLoadingUser) {
    return (
      <AppLayout>
        <div className={styles.loading}>
          <Loader type="ThreeDots" color="#9fae77" width={256} height={256} />
        </div>
      </AppLayout>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <AppLayout>
        <Router basepath="/cc">
          <Login path="/login" />
          <Signup path="/signup" />
          <SignupConfirm path="/thankyou" />
          <Home path="/" />
        </Router>
      </AppLayout>
    </UserContext.Provider>
  );
}
