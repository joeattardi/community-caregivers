import React from 'react';

import BackgroundImage from 'gatsby-background-image';

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
          <p>{data.markdownRemark.frontmatter.intro}</p>
        </div>
      </BackgroundImage>
      <main className={styles.main}></main>
    </>
  );
}
