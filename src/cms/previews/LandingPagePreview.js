import React from 'react';

import LandingPageContent from '../../components/landingPage/LandingPageContent';

import '../../index.scss';

export default function LandingPagePreview({ entry }) {
  const cmsData = entry.getIn(['data']).toJS();

  const data = {
    markdownRemark: {
      frontmatter: {
        ...cmsData
      }
    }
  };

  const heroImage = cmsData.heroImage;

  data.markdownRemark.frontmatter.heroImage = {
    childImageSharp: {
      fluid: {
        src: heroImage
      }
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <LandingPageContent data={data} />
    </div>
  );
}
