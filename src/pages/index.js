import React from 'react';

import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Layout from '../components/Layout';

import styles from './index.module.scss';

export default function IndexPage({ data }) {
  console.log(data);

  return (
    <Layout>
      <BackgroundImage className={styles.hero} fluid={data.hero.childImageSharp.fluid}>
        <div className={styles.inner}>
          <h1>
            <span>Make an impact today</span>
          </h1>
          <h2>No one should ever be hungry.</h2>
          <p>
            We are a group of caring volunteers shopping and delivering
            groceries to seniors and our disabled neighbors. We also work
            closely with the Community Pantry to deliver food to anyone who is
            food insecure.
          </p>
        </div>
      </BackgroundImage>
      <main className={styles.main}></main>
    </Layout>
  );
}

export const query = graphql`
  {
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
