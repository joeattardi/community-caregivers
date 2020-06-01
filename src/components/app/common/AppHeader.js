import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

import UserContext from '../UserContext';

import NavigationMenu from './NavigationMenu';

import styles from './AppHeader.module.scss';

export default function AppHeader() {
  const user = useContext(UserContext);

  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
      </div>
      <div className={styles.title}>
        <h1>
          <Link to="/cc">Caregiver Connect</Link>
        </h1>
        <h2>Volunteer Management System</h2>
      </div>
      {user ? (
        <>
          <nav className={styles.nav}>
            <div className={styles.username}>
              <Link to="/cc/profile">
                {user.firstName} {user.lastName}
              </Link>
            </div>
          </nav>
          <NavigationMenu />
        </>
      ) : null}
    </header>
  );
}
