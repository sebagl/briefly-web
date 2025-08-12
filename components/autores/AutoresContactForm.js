import React, { useState, useEffect } from 'react';
import { TextField, Grid, FormLabel } from '@mui/material';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from './autores.module.css';

export default function AutoresContact(props) {
  const mes = props.message;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState(mes);
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  function resetForm() {
    setName('');
    setEmail('');
    setMensaje('');
    setPhone('');
  }

  const handleLoaded = (e, _) => {
    e.preventDefault();
    window.grecaptcha.ready((_) => {
      window.grecaptcha
        .execute('6Lf-ce0ZAAAAAF1tRbECuEstbArrppA0OhmxigcT', {
          action: 'homepage',
        })
        .then((token) => {
          onSubmit(token);
        });
    });
  };

  useEffect(() => {
    // Add reCaptcha
    const script = document.createElement('script');
    script.src =
			'https://www.google.com/recaptcha/api.js?render=6Lf-ce0ZAAAAAF1tRbECuEstbArrppA0OhmxigcT';
    // script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setMensaje(mes);
  }, [mes]);

  const onSubmit = async (token) => {
    if (email) {
      setDisableSubmit(true);
      setError('');

      await addDoc(collection(db, 'mail'), {
        to: 'contacto@streamreaders.com',
        message: {
          subject: 'Mensaje pagina autores',
          replyTo: email,
          nombre: name,
          correo: email,
          telefono: phone,
          text: mensaje,
          html: `Mensaje de ${name}: ${mensaje}. Telefono: ${phone}. Mail: ${email}`,
        },
      })
        .then(() => {
          resetForm();
          setConfirmation(true);
          setTimeout(setDisableSubmit(false), 10000);
        })
        .catch((error) => {
          setError('Ha ocurrido un error, intentalo nuevamente');
        });
    } else {
      setError('Ingresa tu correo');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLoaded} noValidate>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            className={styles.formField}
            size="small"
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            fullWidth
            id="firstName"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              classes: {
                root: styles.cssLabel,
                focused: styles.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
              inputMode: 'numeric',
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            InputLabelProps={{
              classes: {
                root: styles.cssLabel,
                focused: styles.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
              inputMode: 'numeric',
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            id="phone"
            label="Telefono"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            InputLabelProps={{
              classes: {
                root: styles.cssLabel,
                focused: styles.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
              inputMode: 'numeric',
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="phone"
            label="Mensaje"
            name="phone"
            multiline="true"
            rows="4"
            onChange={(e) => setMensaje(e.target.value)}
            value={mensaje}
            InputLabelProps={{
              classes: {
                root: styles.cssLabel,
                focused: styles.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
              inputMode: 'numeric',
            }}
          />
        </Grid>

        <button className="submit-btn" type="submit" disabled={disableSubmit}>
          {' '}
					Enviar
        </button>
      </Grid>
      {error && <FormLabel error>{error}</FormLabel>}
      {confirmation && (
        <FormLabel>Su mensaje se ha enviado con éxito</FormLabel>
      )}
      <div
        className="g-recaptcha"
        data-sitekey="6Lf-ce0ZAAAAAF1tRbECuEstbArrppA0OhmxigcT"
        data-size="invisible"
      ></div>
    </form>
  );
}
