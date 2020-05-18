import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Select from 'react-select';
import us from 'us';

import styles from './Signup.module.scss';

const stateOptions = us.STATES.map(state => ({
  value: state.abbr,
  label: state.name
}));

export default function Signup() {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "volunteers.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <BackgroundImage
          className={styles.image}
          fluid={data.file.childImageSharp.fluid}
        ></BackgroundImage>
        <div className={styles.signupForm}>
          <h1>Sign up to be a volunteer</h1>
          <form>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="first-name">First name</label>
                <input type="text" id="first-name" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="last-name">Last name</label>
                <input type="text" id="last-name" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
              </div>
              <div className={`${styles.formField} ${styles.state}`}>
                <label htmlFor="state">State</label>
                <Select options={stateOptions} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="zip">ZIP code</label>
                <input type="text" id="zip" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="phone">Phone number</label>
                <input type="tel" id="phone" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="password">Create a password</label>
                <input type="password" id="password" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" id="confirm-password" />
              </div>
            </div>
            <div className={styles.formRow}>
              <button className={`brand ${styles.submit}`}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
