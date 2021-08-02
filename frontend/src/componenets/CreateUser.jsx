import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addNewUser } from '../helpers/sendDataToServer';
import backendServer from '../helpers/configBackend';

export default function CreateUser() {
  const [notification, setNotification] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      city: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      country: Yup.string()
        .required('Required'),
      city: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('Required'),
      phone: Yup.string()
        .required('Required'),
      password: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      const formValues = JSON.stringify(values, null, 2);

      const postURL = `${backendServer}/addUserData`;
      const afterPostData = addNewUser(formValues, postURL);
      console.log(afterPostData);
      setNotification('Successfully created User');
    },
  });

  return (
    <>
      <div id="yourProfile"> Your Profile</div>
      <div id="profileBlock">
        <div id="profilePhoto">
          <img src="assets/images/profile.jpeg" alt="profilePic" />
          <div className="user-notification">
            {' '}
            { notification }
            {' '}
          </div>
        </div>

        <div id="formBlock">
          <form onSubmit={formik.handleSubmit}>

            <div id="leftForm">

              <br />
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                {...formik.getFieldProps('firstName')}
              />
              <br />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="form_error">{formik.errors.firstName}</div>
              ) : null}

              <br />
              <input
                id="lastName"
                type="text"
                placeholder="lastName"
                {...formik.getFieldProps('lastName')}
              />
              <br />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="form_error">{formik.errors.lastName}</div>
              ) : null}

              <br />
              <input
                id="country"
                type="text"
                placeholder="country"
                {...formik.getFieldProps('country')}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="form_error">{formik.errors.lastName}</div>
              ) : null}

              <br />
              <input
                id="city"
                type="text"
                placeholder="city"
                {...formik.getFieldProps('city')}
              />
              <br />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="form_error">{formik.errors.lastName}</div>
              ) : null}

            </div>
            <div id="rightForm">

              <br />
              <input
                id="email"
                type="email"
                placeholder="email"
                {...formik.getFieldProps('email')}
              />
              <br />
              {formik.touched.email && formik.errors.email ? (
                <div className="form_error">{formik.errors.email}</div>
              ) : null}

              <br />
              <input
                id="password"
                type="password"
                placeholder="password"
                {...formik.getFieldProps('password')}
              />
              <br />
              {formik.touched.password && formik.errors.password ? (
                <div className="form_error">{formik.errors.password}</div>
              ) : null}

              <br />
              <input
                id="phone"
                type="text"
                placeholder="phone"
                {...formik.getFieldProps('phone')}
              />
              <br />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="form_error">{formik.errors.phone}</div>
              ) : null}

            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

    </>

  );
}
