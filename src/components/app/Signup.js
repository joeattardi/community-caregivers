import React, { useRef, useEffect } from 'react';

import * as EmailValidator from 'email-validator';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { Controller, useForm } from 'react-hook-form';
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

  const { control, register, handleSubmit, watch, errors } = useForm();

  function signup(data) {
    console.log(data);
  }

  const firstNameElement = useRef();

  useEffect(() => {
    firstNameElement.current.focus();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <BackgroundImage
          className={styles.image}
          fluid={data.file.childImageSharp.fluid}
        ></BackgroundImage>
        <div className={styles.signupForm}>
          <h1>Sign up to be a volunteer</h1>
          <form onSubmit={handleSubmit(signup)}>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  ref={e => {
                    firstNameElement.current = e;
                    register({ e, required: true });
                  }}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  ref={register({ required: true })}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  ref={register({ required: true })}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  ref={register({ required: true })}
                />
              </div>
              <div className={`${styles.formField} ${styles.state}`}>
                <label htmlFor="state">State</label>
                <Controller
                  as={Select}
                  name="state"
                  control={control}
                  options={stateOptions}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="zip">ZIP code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  ref={register({ required: true })}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  ref={register({ required: true })}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={register({
                    required: true,
                    validate: value => EmailValidator.validate(value)
                  })}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="password">Create a password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={register({ required: true, minLength: 6 })}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  ref={register({
                    required: true,
                    validate: value => value === watch('password')
                  })}
                />
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
