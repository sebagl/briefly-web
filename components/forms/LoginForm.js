import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik/FormikControl';
import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useAuth } from '../../context_providers/auth/authContext';
import Button from '../common';
import GoogleButton from '../common/buttons/GoogleButton';

function LoginForm(props) {
  // @ts-ignore
  const { login, getUserData, authenticateUser, googleSignin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  async function handleGoogleSignin() {
    try {
      setError('');
      setLoading(true);
      const userCredential = await googleSignin();
      await authenticateUser(userCredential);
    } catch (error) {
      setError('Ha ocurrido un error, inténtalo nuevamente');   
    }
  
    setLoading(false);
  }
  

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato de e-mail incorrecto')
      .required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
  });

  const onSubmit = async (values) => {
    try {
      setError('');
      setLoading(true);
      await login(values.email, values.password);
      authenticateUser();
      await getUserData();
      router.push('/');
    } catch {
      setError('Revisa los datos ingresados');
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
          <Form >
            {error && <Alert severity="error">{error}</Alert>}
            <div style={{marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
              <GoogleButton onClick={handleGoogleSignin} buttonText="Ingresa con Google" width="100%" spacing="15px"/>  
            </div>
            <FormikControl
              className="text-input"
              control="input"
              type="email"
              label="Correo Electrónico"
              name="email"
            />
            <FormikControl
              className="text-input"
              control="input"
              type="password"
              label="Contraseña"
              name="password"
            />
            <div style={{margin: '15px', display: 'flex', justifyContent: 'center'}}>
              <Button text="Enviar" size="small" onClick={onSubmit}/>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
