import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik/FormikControl';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context_providers/auth/authContext';
import Button from '../common/buttons/Button';

function LoginForm(props) {
  const { currentUser } = useAuth();
  const [confirmation, setConfirmation] = useState(false);
  const initialValues = {
    email: currentUser ? currentUser.email : '',
    mensaje: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato de e-mail incorrecto')
      .required('Campo requerido'),
    mensaje: Yup.string().required('Campo requerido'),
  });

  const onSubmit = async (values) => {
    await addDoc(collection(db, 'mail'), {
      to: 'contacto@streamreaders.com',
      message: {
        subject: 'New message from Briefly Books - Contact form',
        replyTo: values.email,
        text: values.mensaje,
        html: `Message from ${values.email}: ${values.mensaje}`,
      },
    })
      .then(setConfirmation(true))
      .catch((error) => console.log(error));
    setTimeout(() => setConfirmation(false), 10000);
    values.mensaje = '';
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="formHome">
            {confirmation && (
            <p className="success">Your message has been sent successfully</p>
            )}
            <FormikControl
              className="text-input"
              control="input"
              type="name"
              label="Name"
              name="name"
            />
            <FormikControl
              className="text-input"
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              className="textarea"
              control="textarea"
              type="textarea"
              label="Message"
              placeholder="Message"
              name="mensaje"
              rows="5"
            />
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              text="Send Message"
              size="small"
            />
							
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
