import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import ReactMarkdown from 'react-markdown';

import styles from './SignupConfirm.module.scss';

export default function SignupConfirm({ location }) {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { templateKey: { eq: "registration" } }) {
        frontmatter {
          postRegistrationMessage
        }
      }
    }
  `);

  const title =
    location.state && location.state.name
      ? `Thank you, ${location.state.name}!`
      : 'Thank you!';

  return (
    <div className={styles.main}>
      <h1>{title}</h1>
      <ReactMarkdown
        source={data.markdownRemark.frontmatter.postRegistrationMessage}
      />
    </div>
  );
}
