import React from 'react';

import styles from './SignupConfirm.module.scss';

export default function SignupConfirm({ location }) {
  return (
    <div className={styles.main}>
      <h1>Thank you, {location.state.name}!</h1>
      <p>
        Your registration has been received. You should be hearing from us soon.
      </p>
    </div>
  );
}
