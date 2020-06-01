import React from 'react';

import { Link, graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import styles from './Header.module.scss';

export default function Header() {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { templateKey: { eq: "header" } }) {
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
      <div className={styles.logo}>
        <Link to="/">
          <Img
            alt="Community Caregivers"
            fluid={
              data.markdownRemark.frontmatter.logoImage.childImageSharp.fluid
            }
          />
        </Link>
      </div>
      <h1>
        <Link to="/">Community Caregivers US</Link>
      </h1>
      <nav>
        <Link to="/cc/login">Volunteer Login</Link>
      </nav>
    </header>
  );
}
