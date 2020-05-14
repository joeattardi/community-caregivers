import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { graphql, useStaticQuery } from 'gatsby';

import FacebookPageEmbed from './FacebookPageEmbed';

import styles from './Footer.module.scss';

export default function Footer() {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { templateKey: { eq: "contactInfo" } }) {
        frontmatter {
          facebookUrl
          email
        }
      }
    }
  `);

  return (
    <footer className={styles.footer}>
      <FacebookPageEmbed />
      <div className={styles.contact}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={data.markdownRemark.frontmatter.facebookUrl}
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" fixedWidth={true} />
        </a>
        <a href={`mailto:${data.markdownRemark.frontmatter.email}`}>
          <FontAwesomeIcon icon={faEnvelope} size="2x" fixedWidth={true} />
        </a>
      </div>
    </footer>
  );
}
