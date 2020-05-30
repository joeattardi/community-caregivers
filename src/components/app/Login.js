import React, { useContext, useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';

import FirebaseContext from '../../firebase/FirebaseContext';

import Banner from './Banner';

import styles from './Login.module.scss';

export default function Login() {
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: 'onBlur'
  });

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const emailElement = useRef();
  const passwordElement = useRef();

  const firebaseRef = useContext(FirebaseContext);

  useEffect(() => {
    emailElement.current.focus();
  }, []);

  async function login(data) {
    setLoading(true);
    try {
      const result = await firebaseRef
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
        setError('Invalid email address or password.');
        setValue('password', '');
      } else if (err.code === 'auth/user-disabled') {
        setError('This account has been disabled.');
      }
      setLoading(false);
    }
  }

  return (
    <div className={styles.main}>
      {error && <Banner type="error">{error}</Banner>}
      <div className={styles.container}>
        <h1>Volunteer Login</h1>
        <form onSubmit={handleSubmit(login)}>
          <div className={styles.formField}>
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              name="email"
              ref={e => {
                emailElement.current = e;
                register(e, { required: 'Email address is required' });
              }}
            />
            <div id="email-error" className="form-error">
              {errors.email && errors.email.message}
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={e => {
                passwordElement.current = e;
                register(e, { required: 'Password is required' });
              }}
            />
            <div id="password-error" className="form-error">
              {errors.password && errors.password.message}
            </div>
          </div>

          <div className={styles.formField}>
            <button className={`brand ${styles.submit}`} disabled={isLoading}>
              {isLoading ? (
                <Loader type="Oval" color="#FFFFFF" width={16} height={16} />
              ) : (
                <span>Log in</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
