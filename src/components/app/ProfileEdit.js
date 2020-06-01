import React, { useContext, useRef } from 'react';

import * as EmailValidator from 'email-validator';
import { navigate } from 'gatsby';
import { Controller, useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import Select from 'react-select';
import us from 'us';

import withAuth from './auth/withAuth';
import AppLayout from './common/AppLayout';
import UserContext from './UserContext';

import styles from './ProfileEdit.module.scss';

const stateOptions = us.STATES.map(state => ({
  value: state.abbr,
  label: state.name
}));

function ProfileEdit() {
  const user = useContext(UserContext);

  const { control, register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: stateOptions.find(state => state.value === user.state),
      zip: user.zip,
      email: user.email,
      phone: user.phone
    }
  });

  const firstNameElement = useRef();

  async function save(data) {
    console.log(data);
  }

  return (
    <AppLayout title="Edit Profile">
      <div className={styles.main}>
        <form className={styles.profileForm} onSubmit={handleSubmit(save)}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                ref={e => {
                  firstNameElement.current = e;
                  register(e, { required: 'First name is required' });
                }}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                ref={register({ required: 'Last name is required' })}
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
                ref={register({ required: 'Address is required' })}
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
                ref={register({ required: 'City is required' })}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="state">State</label>
              <Controller
                as={Select}
                name="state"
                control={control}
                options={stateOptions}
                rules={{ required: 'State is required' }}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="zip">ZIP code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                ref={register({ required: 'ZIP code is required' })}
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
                ref={register({ required: 'Phone number is required' })}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={register({
                  required: 'Email address is required',
                  validate: value =>
                    EmailValidator.validate(value) || 'Invalid email address'
                })}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <button type="submit" className="brand">Save</button>
            <button type="button" className="brand">Cancel</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

export default withAuth(ProfileEdit);
