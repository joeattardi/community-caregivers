import React, { useContext, useEffect, useState } from 'react';

import { GeoFirestore } from 'geofirestore';
import { Router } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';

import FirebaseContext from '../../firebase/FirebaseContext';
import UserContext from './UserContext';

import AppLayout from './common/AppLayout';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Signup from './Signup';
import SignupConfirm from './SignupConfirm';

import styles from './App.module.scss';

export default function App() {
  const firebaseRef = useContext(FirebaseContext);
  const [user, isLoadingUser] = useAuthState(firebaseRef.auth());
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingUserProfile, setLoadingUserProfile] = useState(true);

  useEffect(() => {
    if (!isLoadingUser) {
      if (user) {
        setLoadingUserProfile(true);
        const userDocument = new GeoFirestore(firebaseRef.firestore())
          .collection('volunteers')
          .doc(user.uid);
        userDocument
          .get()
          .then(data => {
            setUserProfile(data);
            setLoadingUserProfile(false);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setLoadingUserProfile(false);
      }
    }
  }, [isLoadingUser, user, firebaseRef]);

  if (isLoadingUser || isLoadingUserProfile) {
    return (
      <AppLayout>
        <div className={styles.loading}>
          <Loader type="ThreeDots" color="#9fae77" width={256} height={256} />
        </div>
      </AppLayout>
    );
  }

  return (
    <UserContext.Provider
      value={
        user &&
        userProfile && {
          email: user.email,
          uid: user.uid,
          ...userProfile.data()
        }
      }
    >
      <Router basepath="/cc">
        <Login path="/login" />
        <Signup path="/signup" />
        <SignupConfirm path="/thankyou" />
        <Profile path="/profile" />
        <ProfileEdit path="/profile/edit" />
        <Home path="/" />
        <NotFound default />
      </Router>
    </UserContext.Provider>
  );
}
