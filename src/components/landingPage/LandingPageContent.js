import React from 'react';

import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import ReactMarkdown from 'react-markdown';

import styles from './LandingPageContent.module.scss';

export default function LandingPageContent({ data }) {
  return (
    <>
      <BackgroundImage
        className={styles.hero}
        fluid={data.markdownRemark.frontmatter.heroImage.childImageSharp.fluid}
      >
        <div className={styles.inner}>
          <h1>
            <span>{data.markdownRemark.frontmatter.headline}</span>
          </h1>
          <h2>{data.markdownRemark.frontmatter.subHeadline}</h2>
          <ReactMarkdown
            className={styles.intro}
            source={data.markdownRemark.frontmatter.intro}
          />

          <Link className={styles.callToAction} to="/cc/signup">
            Volunteer today
          </Link>
          <Link className={styles.callToAction} to="/">
            Request help
          </Link>
        </div>
      </BackgroundImage>
      <main className={styles.main}></main>
    </>
  );
}
