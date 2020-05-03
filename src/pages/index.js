import React from 'react';

import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import LandingPageContent from '../components/landingPage/LandingPageContent';

export default function IndexPage({ data }) {
  return (
    <Layout>
      <LandingPageContent data={data} />
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
