import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import styles from './Footer.module.scss';

export default function Footer() {
  const data = useStaticQuery(graphql`
  {
    file(relativePath: { eq: "logo-only-white.png" }) {
      childImageSharp {
        fixed(width: 50) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`);

  return (
    <>
      <footer className={styles.footer}>
        <Img alt="Community Caregivers" fixed={data.file.childImageSharp.fixed} />
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
      <div className={styles.copyright}>
        Copyright &copy; 2020, Community Caregivers
      </div>
    </>
  );
}
