import React from 'react';
import { Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import AutoresContactForm from './AutoresContactForm';
import styles from './autores.module.css';

const useStyles = makeStyles(() => ({
  image: {
    minHeight: '65vh',
    backgroundImage:
			'url(\'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2FfondoLibroBlanca.jpg?alt=media&token=e7daac8a-db40-42b1-8ea0-98648552d7ef\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:
			'inset 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    [useTheme().breakpoints.down('sm')]: {
      padding: '1em',
    },
  },
  paper: {
    margin: useTheme().spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: '1em',
  },
  avatar: {
    margin: useTheme().spacing(1),
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,0.7)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: useTheme().spacing(1),
  },
  submit: {
    margin: useTheme().spacing(3, 0, 2),
  },
  link: {
    color: 'grey',
  },
  text: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '1.5em',
    width: '100%',
    fontFamily: 'Montserrat',
    textAlign: 'left',
    marginTop: '1em',
  },

  title: {
    color: '#043e54',
    fontSize: '2em',

    fontFamily: 'Montserrat',
    textAlign: 'left',
    [useTheme().breakpoints.down('xs')]: {
      fontSize: 25,
    },
    [useTheme().breakpoints.down('md')]: {
      color: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
    },
  },
  subtitle: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: '1em',

    fontFamily: 'Montserrat',
    textAlign: 'left',
    [useTheme().breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  hidden: {
    display: 'flex',
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  return (
    <Grid container maxWidth="xl" className={styles['contact-image']}>
      <Grid item xs={12} md={6}>
        <p className={styles['contact-title']}>¡TU OBRA EN AUDIOLIBRO!</p>
        <p className={styles['contact-subtitle']}>
					Nos pondremos en contacto contigo para darte mas detalles
        </p>
      </Grid>
      <Grid item xs={12} md={6}>
        <AutoresContactForm message={props.message} />
      </Grid>
    </Grid>
  );
}
