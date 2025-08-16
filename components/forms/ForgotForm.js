import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik/FormikControl';
import { useAuth } from '../../context_providers/auth/authContext';
import { Alert } from '@mui/material';

function ForgotForm(props) {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato de e-mail incorrecto')
      .required('Campo requerido'),
  });

  const onSubmit = async (values) => {
    try {
      setError('');
      setLoading(true);
      await resetPassword(values.email);
      setMessage('Te enviamos un correo con instrucciones');
      setTimeout(props.showLogin(), 5000);
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="login-form">
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert>{message}</Alert>}
            <FormikControl
              className="text-input"
              control="input"
              // control='chakraInput'
              type="email"
              label="Email"
              name="email"
            />

            <button
              className="blue-button"
              type="submit"
              disabled={!formik.isValid || loading}
            >
								Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ForgotForm;
