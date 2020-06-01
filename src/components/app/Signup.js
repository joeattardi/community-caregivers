import React, { useRef, useContext, useEffect, useState } from 'react';

import { useNavigate } from '@reach/router';
import * as EmailValidator from 'email-validator';
import * as firebase from 'firebase/app';
import { Link, useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { GeoFirestore } from 'geofirestore';
import { Controller, useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import ReactMarkdown from 'react-markdown';
import Select from 'react-select';
import us from 'us';

import FirebaseContext from '../../firebase/FirebaseContext';
import { geocode } from '../../services/geocoder';

import AppLayout from './common/AppLayout';
import Banner from './common/Banner';

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

      markdownRemark(frontmatter: { templateKey: { eq: "registration" } }) {
        frontmatter {
          preRegistrationMessage
        }
      }
    }
  `);

  const firebaseRef = useContext(FirebaseContext);

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

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

  const navigate = useNavigate();

  async function signup(data) {
    setLoading(true);

    const auth = firebaseRef.auth();

    const coordinates = await geocode(
      data.address,
      data.city,
      data.state.value,
      data.zip
    );

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      const firestore = firebaseRef.firestore();
      const geofirestore = new GeoFirestore(firestore);
      const geoCollection = geofirestore.collection('volunteers');
      await geoCollection.doc(user.uid).set({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state.value,
        zip: data.zip,
        phone: data.phone,
        email: data.email,
        joined: new Date(),
        active: false,
        coordinates: new firebase.firestore.GeoPoint(
          coordinates.lat,
          coordinates.lng
        )
      });

      navigate('/cc/thankyou', { state: { name: data.firstName } });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError(
          'The email address you specified is already in use by another volunteer.'
        );
        emailElement.current.focus();
      } else {
        setError('An unexpected error has occurred.');
      }

      setLoading(false);
    }
  }

  const firstNameElement = useRef();
  const emailElement = useRef();

  useEffect(() => {
    firstNameElement.current.focus();
  }, []);

  return (
    <AppLayout>
      <div className={styles.main}>
        {error && <Banner type="error">{error}</Banner>}
        <div className={styles.container}>
          <BackgroundImage
            className={styles.image}
            fluid={data.file.childImageSharp.fluid}
          ></BackgroundImage>
          <div className={styles.signupForm}>
            <h1>Sign up to be a volunteer</h1>

            <ReactMarkdown
              source={data.markdownRemark.frontmatter.preRegistrationMessage}
            />

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
                    aria-invalid={!!errors.firstName}
                    aria-describedby="firstName-error"
                  />
                  <div id="firstName-error" className="form-error">
                    {errors.firstName && errors.firstName.message}
                  </div>
                </div>
                <div className={styles.formField}>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={errors.lastName ? styles.error : ''}
                    ref={register({ required: 'Last name is required' })}
                    aria-invalid={!!errors.lastName}
                    aria-describedby="lastName-error"
                  />
                  <div id="lastName-error" className="form-error">
                    {errors.lastName && errors.lastName.message}
                  </div>
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
                    aria-invalid={!!errors.address}
                    aria-describedby="address-error"
                  />
                  <div id="address-error" className="form-error">
                    {errors.address && errors.address.message}
                  </div>
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
                    aria-invalid={!!errors.city}
                    aria-describedby="city-error"
                  />
                  <div id="city-error" className="form-error">
                    {errors.city && errors.city.message}
                  </div>
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
                  <div className="form-error">
                    {errors.state && errors.state.message}
                  </div>
                </div>
                <div className={styles.formField}>
                  <label htmlFor="zip">ZIP code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className={errors.zip ? styles.error : ''}
                    ref={register({ required: 'ZIP code is required' })}
                    aria-invalid={!!errors.zip}
                    aria-describedby="zip-error"
                  />
                  <div id="zip-error" className="form-error">
                    {errors.zip && errors.zip.message}
                  </div>
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
                    aria-invalid={!!errors.phone}
                    aria-describedby="phone-error"
                  />
                  <div id="phone-error" className="form-error">
                    {errors.phone && errors.phone.message}
                  </div>
                </div>
                <div className={styles.formField}>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={errors.email ? styles.error : ''}
                    ref={e => {
                      emailElement.current = e;
                      register(e, {
                        required: 'Email address is required',
                        validate: value =>
                          EmailValidator.validate(value) ||
                          'Invalid email address'
                      });
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  <div id="email-error" className="form-error">
                    {errors.email && errors.email.message}
                  </div>
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
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <div id="password-error" className="form-error">
                    {errors.password && errors.password.message}
                  </div>
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
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby="confirmPassword-error"
                  />
                  <div id="confirmPassword-error" className="form-error">
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <button
                  className={`brand ${styles.submit}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader
                      type="Oval"
                      color="#FFFFFF"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <span>Sign up</span>
                  )}
                </button>
              </div>
              <div className={styles.login}>
                Already a volunteer? <Link to="/cc/login">Log in here.</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
