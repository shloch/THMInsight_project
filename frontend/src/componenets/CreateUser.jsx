import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import postDataToServer from '../helpers/sendDataToServer';
import backendServer from '../helpers/configBackend';

export default function CreateUser() {
  const [notification, setNotification] = useState({ infos: 'yo', data: 'xxx' });
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

      // const data = new URLSearchParams();

      const postURL = `${backendServer}/addUserData`;
      const afterPostData = postDataToServer(formValues, postURL);
      setNotification(afterPostData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>
        { notification.infos }
      </h2>

      <label htmlFor="firstName">Name</label>
      <input
        id="firstName"
        type="text"
        {...formik.getFieldProps('firstName')}
      />
      <br />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        {...formik.getFieldProps('lastName')}
      />
      <br />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        {...formik.getFieldProps('country')}
      />
      <br />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="city">City</label>
      <input
        id="city"
        type="text"
        {...formik.getFieldProps('city')}
      />
      <br />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps('email')}
      />
      <br />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps('password')}
      />
      <br />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        type="text"
        {...formik.getFieldProps('phone')}
      />
      <br />
      {formik.touched.phone && formik.errors.phone ? (
        <div>{formik.errors.phone}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
}
