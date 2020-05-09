import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import FacebookPageEmbed from './FacebookPageEmbed';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FacebookPageEmbed />
      <div className={styles.contact}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/Community-Caregivers-112977670396523"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" fixedWidth={true} />
        </a>
      </div>
      <div>
        <a href="mailto:communitycaregiversus@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} size="2x" fixedWidth={true} />
        </a>
      </div>
    </footer>
  );
}
