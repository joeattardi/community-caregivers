import React from 'react';

import { Link } from 'gatsby';

import AppLayout from './common/AppLayout';

import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <AppLayout title="Not Found">
      <div className={styles.main}>
        The page you requested could not be found. Please return to the{' '}
        <Link to="/cc">home page</Link> and try again.
      </div>
    </AppLayout>
  );
}
