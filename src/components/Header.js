import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import styles from './Header.module.scss';

export default function Header() {
  const data = useStaticQuery(graphql`
    {
      desktopImage: markdownRemark(frontmatter: {templateKey: {eq: "header"}}) {
        frontmatter {
          logoImage {
            childImageSharp {
              fixed(height: 100) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }

      mobileImage: markdownRemark(frontmatter: {templateKey: {eq: "header"}}) {
        frontmatter {
          logoImage {
            childImageSharp {
              fixed(height: 50) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  `);

  const sources = [
    data.desktopImage.frontmatter.logoImage.childImageSharp.fixed,
    {
      ...data.mobileImage.frontmatter.logoImage.childImageSharp.fixed,
      media: '(max-width: 500px)'
    }
  ]

  return (
    <header id={styles.header}>
      <Img className={styles.logo} alt="Community Caregivers" fixed={sources} />
      <h1>Community Caregivers US</h1>
    </header>
  )
}
