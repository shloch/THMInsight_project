import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import backendServer from '../helpers/configBackend';
import frontendServer from '../helpers/configFrontEnd';
import { authenticate } from '../helpers/sendDataToServer';

export default function Login() {
  const [notification, setNotification] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      const formValues = JSON.stringify(values, null, 2);

      const postURL = `${backendServer}/authenticate`;
      const auth = authenticate(formValues, postURL);
      auth.then((data) => {
        setNotification(`Signed In as ${data.lastname} : {userID: ${data.id}}`);
        setTimeout(() => {
          let params = `email=${data.email}&phone=${data.phone}&city=${data.city}&country=${data.country}&id=${data.id}`;
          params += `&firstname=${data.firstname}&lastname=${data.lastname}`;
          window.location.href = `${frontendServer}/editUser?${params}`;
        }, 5000);
      });
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
              <button type="submit">Submit</button>
            </div>
            {/* <div id="rightForm">
              yo
            </div> */}

          </form>
        </div>
      </div>

    </>

  );
}
