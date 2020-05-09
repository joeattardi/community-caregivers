import React from 'react';

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
        </div>
      </BackgroundImage>
      <main className={styles.main}></main>
    </>
  );
}
