import React, { useState } from 'react';

import styles from './NavigationMenu.module.scss';

export default function NavigationMenu() {
  const [isOpen, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!isOpen);
  }

  return (
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
  );
}
