import React, { useContext } from 'react';

import { format } from 'date-fns';
import { Link } from 'gatsby';

import UserContext from './UserContext';

import withAuth from './auth/withAuth';
import AppLayout from './common/AppLayout';

import styles from './Profile.module.scss';

function Profile() {
  const user = useContext(UserContext);

  return (
    <AppLayout title="My Profile">
      <div className={styles.main}>
        <div className={`${styles.name} ${styles.section}`}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <div className={styles.startDate}>
            Volunteer since {format(user.joined.toDate(), 'MMMM d, yyyy')}
          </div>
        </div>

        <div className={styles.actions}>
          <Link className="button-link" to="/cc/profile/edit">
            Edit profile
          </Link>
          <Link className="button-link" to="/cc/changePassword">
            Change password
          </Link>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Status</div>
          <div>{user.active ? 'Active' : 'Inactive'}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Address</div>
          <div>{user.address}</div>
          <div>
            {user.city}, {user.state} {user.zip}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Email address</div>
          <div>{user.email}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Phone number</div>
          <div>{user.phone}</div>
        </div>
      </div>
    </AppLayout>
  );
}

export default withAuth(Profile);
