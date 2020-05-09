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
              fixed(height: 100) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  `);

  return (
    <header id={styles.header}>
      <Img alt="Community Caregivers" fixed={data.markdownRemark.frontmatter.logoImage.childImageSharp.fixed} />
      <h1>Community Caregivers US</h1>
    </header>
  )
}

/*
{
  logo: file(relativePath: { eq: "heart-logo.jpg" }) {
    childImageSharp {
      fixed(width: 100) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
  }
}*/