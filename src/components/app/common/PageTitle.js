import React from 'react';

import styles from './PageTitle.module.scss';

export default function PageTitle({ title }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
    </div>
  );
}
