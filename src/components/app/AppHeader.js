import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './AppHeader.module.scss';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
      </div>
      <div className={styles.title}>
        <h1>Caregiver Connect</h1>
        <h2>Volunteer Management System</h2>
      </div>
    </header>
  );
}
