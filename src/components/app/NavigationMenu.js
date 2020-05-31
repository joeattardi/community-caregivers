import React, { useState, useContext } from 'react';

import { navigate } from 'gatsby';

import FirebaseContext from '../../firebase/FirebaseContext';

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
        <a href="#" onClick={logout}>
          Log Out
        </a>
      </div>
    </div>
  );
}
