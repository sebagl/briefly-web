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
        subject: 'Nuevo mensaje de Stream Readers - Planilla de Contacto',
        replyTo: values.email,
        text: values.mensaje,
        html: `Mensaje de ${values.email}: ${values.mensaje}`,
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
              <p className="success">Tu mensaje se ha enviado con éxito</p>
            )}
            <FormikControl
              className="text-input"
              control="input"
              type="name"
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
              className="textarea"
              control="textarea"
              type="textarea"
              label="Mensaje"
              placeholder="Mensaje"
              name="mensaje"
              rows="5"
            />
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              text="Enviar Mensaje"
              size="small"
            />
							
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
