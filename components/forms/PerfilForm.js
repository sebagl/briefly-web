import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useAuth } from '../../context_providers/auth/authContext';
import Button from '../common';

function PerfilForm(props) {
  const [isSubmited, setIsSubmited] = useState(false);

  // @ts-ignore
  const { currentUser } = useAuth();

  const initialValues = {
    usuario: '',
    nombre: '',
    apellido: '',
    pais: '',
    ciudad: '',
    edad: '',
    sexo: '',
  };

  const onSubmit = (values) => {
    setIsSubmited(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="login-form">
            {isSubmited && <p>Your profile was updated successfully</p>}

            <p className="item-perfil">
              <strong>Email: </strong>
              {currentUser.email}
            </p>
            <p className="item-perfil">
              <strong>Membership: </strong>
							Mensual
            </p>
            <p className="item-perfil">
              <strong>Miembro desde: </strong>{' '}
              {currentUser.metadata.creationTime}
            </p>
						
            <Button size="small" onClick={props.handleCancel} text="Cancel membership" variant="primary"/>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PerfilForm;
