import React, { useContext, useEffect, useRef, useState } from 'react';

import { navigate, Link } from 'gatsby';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';

import FirebaseContext from '../../firebase/FirebaseContext';
import UserContext from './UserContext';

import AppLayout from './common/AppLayout';
import Banner from './common/Banner';

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

  const user = useContext(UserContext);
  if (user) {
    navigate('/cc');
  }

  useEffect(() => {
    emailElement.current.focus();
  }, []);

  async function login(data) {
    setLoading(true);
    try {
      await firebaseRef
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      navigate('/cc');
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
    <AppLayout>
      <div className={styles.main}>
        {error && <Banner type="error">{error}</Banner>}
        <div className={styles.container}>
          <h1>Volunteer Login</h1>
          <form
            noValidate
            className={styles.loginForm}
            onSubmit={handleSubmit(login)}
          >
            <div className={styles.formField}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={errors.email ? styles.error : ''}
                ref={e => {
                  emailElement.current = e;
                  register(e, { required: 'Email address is required' });
                }}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
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
                className={errors.password ? styles.error : ''}
                ref={e => {
                  passwordElement.current = e;
                  register(e, { required: 'Password is required' });
                }}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
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
          <div className={styles.signup}>
            Not a volunteer yet? <Link to="/cc/signup">Sign up today!</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
