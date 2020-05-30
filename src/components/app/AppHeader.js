import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { navigate, Link } from 'gatsby';

import FirebaseContext from '../../firebase/FirebaseContext';
import UserContext from './UserContext';

import styles from './AppHeader.module.scss';

export default function AppHeader() {
  const user = useContext(UserContext);
  const firebaseRef = useContext(FirebaseContext);

  async function logout(event) {
    event.preventDefault();
    await firebaseRef.auth().signOut();
    navigate('/cc/login');
  }

  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
      </div>
      <div className={styles.title}>
        <h1>Caregiver Connect</h1>
        <h2>Volunteer Management System</h2>
      </div>
      {user ? (
        <nav className={styles.nav}>
          <div className={styles.username}>
            <FontAwesomeIcon icon={faUser} /> {user.firstName} {user.lastName}
          </div>
          <a href="#" onClick={logout}>
            Log out
          </a>
        </nav>
      ) : null}
    </header>
  );
}
