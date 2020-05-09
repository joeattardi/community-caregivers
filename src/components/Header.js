import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import styles from './Header.module.scss';

export default function Header() {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: {templateKey: {eq: "header"}}) {
        frontmatter {
          logoImage {
            childImageSharp {
              fluid(maxWidth: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  `);

  return (
    <header id={styles.header}>
      <div className={styles.logo}><Img alt="Community Caregivers" fluid={data.markdownRemark.frontmatter.logoImage.childImageSharp.fluid} /></div>
      <h1>Community Caregivers US</h1>
    </header>
  )
}
