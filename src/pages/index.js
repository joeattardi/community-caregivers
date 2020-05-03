import React from 'react';

import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Layout from '../components/Layout';

import styles from './index.module.scss';

export default function IndexPage({ data }) {
  return (
    <Layout>
      <BackgroundImage className={styles.hero} fluid={data.markdownRemark.frontmatter.heroImage.childImageSharp.fluid}>
        <div className={styles.inner}>
          <h1>
            <span>{data.markdownRemark.frontmatter.headline}</span>
          </h1>
          <h2>{data.markdownRemark.frontmatter.subHeadline}</h2>
          <p>{data.markdownRemark.frontmatter.intro}</p>
        </div>
      </BackgroundImage>
      <main className={styles.main}></main>
    </Layout>
  );
}

export const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "landing-page"}}) {
      frontmatter {
        headline
        subHeadline
        intro
        heroImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
