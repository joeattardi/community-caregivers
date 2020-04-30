import React from 'react';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header id={styles.header}>
      <img className={styles.logo} src="/header.png" />
    </header>
  )
}
