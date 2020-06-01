import React, { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Link, navigate } from 'gatsby';

import FirebaseContext from '../../../firebase/FirebaseContext';

import styles from './NavigationMenu.module.scss';

export default function NavigationMenu() {
  const [isOpen, setOpen] = useState(false);

  const firebaseRef = useContext(FirebaseContext);

  function toggleMenu() {
    setOpen(!isOpen);
  }

  async function logout(event) {
    event.preventDefault();
    await firebaseRef.auth().signOut();
    navigate('/cc/login');
  }

  return (
    <div className={styles.menuContainer}>
      <div
        className={
          isOpen ? `${styles.hamburger} ${styles.open}` : styles.hamburger
        }
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={isOpen ? `${styles.menu} ${styles.open}` : styles.menu}>
        <Link to="/cc" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faHome} size="lg" fixedWidth={true} /> Home
        </Link>
        <Link to="/cc/profile" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faUser} size="lg" fixedWidth={true} /> My
          Profile
        </Link>
        <a href="#" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" fixedWidth={true} />{' '}
          Log Out
        </a>
      </div>
    </div>
  );
}
