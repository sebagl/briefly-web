import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikControl from './formik/FormikControl';
import * as Yup from 'yup';
import { useModalsContext, useAuth } from '../../context_providers';
import Button from '../common';
import { getAnalytics, logEvent } from 'firebase/analytics';
import GoogleButton from '../common/buttons/GoogleButton';



function RegistrationForm(props) {
  // @ts-ignore

  const { toggleTerms, togglePrivacy } = useModalsContext();
  const analytics = getAnalytics();
  const { signup, googleSignin } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit(values) {
    try {
      setError('');
      setLoading(true);
      // Log the subscription event
      logEvent(analytics, 'subscribe', {
        platform: 'web'
      });
      if (typeof window !== 'undefined') {
        // Google Ads conversion tracking
        window.gtag('event', 'conversion', {
          'send_to': 'AW-11396911771/ByZ-CM7v7_IYEJulvLoq',
        });
      }
      await signup(values.email, values.password, values.name);
      props.setShowPlans(true);
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo ya está en uso. Inicia Sesión');
      } else {
        setError('Ha ocurrido un error, inténtalo nuevamente');
      }
    }
  
    setLoading(false);
  }

  async function handleGoogleSignin() {
    try {
      setError('');
      setLoading(true);
      // Log the subscription event
      logEvent(analytics, 'subscribe', {
        platform: 'web'
      });
      await googleSignin();

    } catch (error) {
      setError('Ha ocurrido un error, inténtalo nuevamente');   
    }
  
    setLoading(false);
  }
  
  


  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false, 
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido'),  // validate name if it's required
    email: Yup.string()
      .email('Formato de e-mail incorrecto')
      .required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Campo requerido'),
    acceptTerms: Yup.bool().oneOf([true], 'Debe aceptar los términos y condiciones y la política de privacidad').required('Campo requerido'),
  });

  const submitForm = (values) => {
    props.setFormValues(values);
    props.setShowPlans(true);
  };
  

  return (
    <>
      <h3 style={{padding: '0 5px'}}>Para comenzar, vamos a crear tu cuenta</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(e) => handleSubmit(e)} 
      >
        {(formik) => {
          return (
            <Form id="registration-form">
              {/* <div style={{marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
                <GoogleButton onClick={handleGoogleSignin} buttonText="Regístrate con Google" />  
               
              </div> */}
              {/* <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', fontSize: '12px'}}>
                &mdash; o ingresa tus datos &mdash;
              </div>  */}
              <FormikControl
                className="text-input"
                control="input"
                type="text"
                label="Nombre"
                name="name"
              />
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
              <FormikControl
                className="text-input"
                control="input"
                type="password"
                label="Confirma Contraseña"
                name="passwordConfirmation"
              />
              <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '20px', fontSize: '12px' }}>
                <Field
                  type="checkbox"
                  name="acceptTerms"
               
                  style={{marginRight: '5px'}}
                />
                <div style={{float: 'left', margin:0}}>
                  Acepto los 
                  <a onClick={toggleTerms} style={{cursor: 'pointer', color: 'grey', textDecoration: 'underline'}}> Términos y Condiciones </a> 
                   y la 
                  <a onClick={togglePrivacy} style={{cursor: 'pointer', color: 'grey', textDecoration: 'underline'}}> Política de Privacidad </a>
                </div>
              </div>
              <ErrorMessage name="acceptTerms" component="div" style={{ color: 'red', fontSize: '12px' }} />
              {props.error && <div style={{ color: 'red', fontSize: '12px' }}>{props.error}</div>}
              <div style={{margin: '15px', display: 'flex', justifyContent: 'center'}}>
                <Button disabled={props.loading} type="submit" style={{fontSize: '16px'}} text="Crea tu cuenta" size="medium" rounded />
              </div>
              {props.loading && <CircularProgress/> }
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default RegistrationForm;
