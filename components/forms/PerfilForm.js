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
            {isSubmited && <p>Tu perfil se actualizó con éxito</p>}

            <p className="item-perfil">
              <strong>Email: </strong>
              {currentUser.email}
            </p>
            <p className="item-perfil">
              <strong>Membresía: </strong>
							Mensual
            </p>
            <p className="item-perfil">
              <strong>Miembro desde: </strong>{' '}
              {currentUser.metadata.creationTime}
            </p>
						
            <Button size="small" onClick={props.handleCancel} text="Cancelar membresía" variant="primary"/>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PerfilForm;
