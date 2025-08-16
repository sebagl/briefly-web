import { useState } from 'react';
import Form from '../common/forms/Form';
import { FormProvider } from '../../context_providers/FormContext';
import TextInput from '../common/forms/TextInput';
import SelectInput from '../common/forms/SelectInput';
import TextAreaInput from '../common/forms/TextAreaInput';
import { required } from '../common/forms/validate';
import Button from '../common';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../context_providers/auth/authContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CancelForm = (props) => {
  const { currentUser } = useAuth();
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'mail'), {
        to: 'contacto@streamreaders.com',
        message: {
          subject: 'Nuevo mensaje de Stream Readers - Cancelacion de suscripcion',
          replyTo: 'contacto@streamreaders.com',
          text: currentUser.email,
          html: `
            <p>Mensaje de ${currentUser.email}:</p>
            <p>Motivo de cancelación: ${values.motivoCancelacion}</p>
            <p>Otro motivo: ${values.otroMotivo || 'N/A'}</p>
            <p>Comentarios adicionales: ${values.comentarios || 'N/A'}</p>
          `,
        },
      });
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
        props.onCancel(); // Redirect to the home page
      }, 10000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider>
      <h2>Cancel your subscription</h2>
      {confirmation ? (
        <p>
          Your cancellation request has been sent. We will email you a confirmation shortly.
        </p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <SelectInput
            name="motivoCancelacion"
            label="Reason for cancellation"
            options={[
              { value: '', label: 'Seleccione un motivo' },
              { value: 'precio', label: 'Price (too expensive)' },
              { value: 'contenido_limitado', label: 'Limited content selection' },
              { value: 'problemas_tecnicos', label: 'Technical issues' },
              { value: 'servicio_alternativo', label: 'Found an alternative service' },
              { value: 'uso_infrecuente', label: 'Uso el servicio con poca frecuencia' },
              { value: 'otro', label: 'Otro' },
            ]}
            validators={[required]}
          />
          <TextInput name="otroMotivo" label="Otro motivo" />
          <TextAreaInput name="comentarios" label="Comentarios adicionales (opcional)" />
         
          {loading ? (
            <CircularProgress />
          ) : (
            <Button size="small" variant="primary" type="submit" text="Confirmar" />
          )}
        </Form>
      )}
    </FormProvider>
  );
};

export default CancelForm;
