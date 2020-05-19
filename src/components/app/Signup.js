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

  const {
    control,
    register,
    handleSubmit,
    watch,
    errors,
    clearError
  } = useForm({
    mode: 'onBlur'
  });

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
                  className={errors.firstName ? styles.error : ''}
                  ref={e => {
                    firstNameElement.current = e;
                    register(e, { required: 'First name is required' });
                  }}
                />
                {errors.firstName ? (
                  <div className="form-error">{errors.firstName.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
              <div className={styles.formField}>
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={errors.lastName ? styles.error : ''}
                  ref={register({ required: 'Last name is required' })}
                />
                {errors.lastName ? (
                  <div className="form-error">{errors.lastName.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className={errors.address ? styles.error : ''}
                  ref={register({ required: 'Address is required' })}
                />
                {errors.address ? (
                  <div className="form-error">{errors.address.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={errors.city ? styles.error : ''}
                  ref={register({ required: 'City is required' })}
                />
                {errors.city ? (
                  <div className="form-error">{errors.city.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
              <div className={`${styles.formField} ${styles.state}`}>
                <label htmlFor="state">State</label>
                <Controller
                  as={Select}
                  name="state"
                  control={control}
                  options={stateOptions}
                  rules={{ required: 'State is required' }}
                  styles={{
                    control: provided => ({
                      ...provided,
                      borderColor: errors.state
                        ? '#a80000'
                        : provided.borderColor
                    })
                  }}
                />
                {errors.state ? (
                  <div className="form-error">{errors.state.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
              <div className={styles.formField}>
                <label htmlFor="zip">ZIP code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className={errors.zip ? styles.error : ''}
                  ref={register({ required: 'ZIP code is required' })}
                />
                {errors.zip ? (
                  <div className="form-error">{errors.zip.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={errors.phone ? styles.error : ''}
                  ref={register({ required: 'Phone number is required' })}
                />
                {errors.phone ? (
                  <div className="form-error">{errors.phone.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={errors.email ? styles.error : ''}
                  ref={register({
                    required: 'Email address is required',
                    validate: value =>
                      EmailValidator.validate(value) || 'Invalid email address'
                  })}
                />
                {errors.email ? (
                  <div className="form-error">{errors.email.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="password">Create a password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={errors.password ? styles.error : ''}
                  onBlur={() =>
                    watch('password') === watch('confirmPassword') &&
                    clearError('confirmPassword')
                  }
                  ref={register({
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                {errors.password ? (
                  <div className="form-error">{errors.password.message}</div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
              </div>
              <div className={styles.formField}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={errors.confirmPassword ? styles.error : ''}
                  ref={register({
                    required: 'Password confirmation is required',
                    validate: value =>
                      value === watch('password') || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword ? (
                  <div className="form-error">
                    {errors.confirmPassword.message}
                  </div>
                ) : (
                  <div className="form-error-placeholder">&nbsp;</div>
                )}
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
