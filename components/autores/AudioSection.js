import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import styles from './autores.module.css';
// import siddartha_intro from "../../public/assets/audio/siddartha_intro.mp3";

const useStyles = makeStyles(() => ({
  orange: {
    backgroundColor: '#043e54',
    padding: '3em 8em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '2rem',
    [useTheme().breakpoints.down('sm')]: {
      padding: '1em',
    },
  },
  orangeText: {
    color: '#f49231',
    fontSize: '1.5rem',
    fontFamily: 'Raleway',
  },
  textBox: {
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.8rem',
  },
}));

function TextAutores() {
  const classes = useStyles();

  return (
    <section className={classes.orange}>
      <div>
        <p className={classes.textBox}>Siddhartha - Herman Hesse</p>
        <div>
          <audio
            className={styles['audio-player']}
            src={'/assets/audio/siddartha_intro.mp3'}
            controls
            controlsList="nodownload"
          ></audio>
        </div>
        <p className={classes.orangeText}>
					Escucha un fragmento - producido por Stream Readers
        </p>
      </div>
    </section>
  );
}

export default TextAutores;
