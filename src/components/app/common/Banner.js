import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './Banner.module.scss';

const icons = {
  error: faExclamationCircle
};

export default function Banner({ type, children }) {
  return (
    <div className={`${styles.banner} ${styles[type]}`}>
      <FontAwesomeIcon icon={icons[type]} size="lg" />
      {children}
    </div>
  );
}
