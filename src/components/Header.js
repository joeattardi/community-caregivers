import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import styles from './Header.module.scss';

export default function Header() {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "header.png" }) {
        childImageSharp {
          fixed(width: 190) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `);

  return (
    <header id={styles.header}>
      <Img alt="Community Caregivers" fixed={data.file.childImageSharp.fixed} />
    </header>
  )
}
