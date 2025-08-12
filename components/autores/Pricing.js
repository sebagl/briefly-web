import React, { useState } from 'react';
import { Select, InputLabel, Grid, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { WordPricingForm, PricingForm } from './PricingForms';

const useStyles = makeStyles(() => ({
  grey: {
    backgroundColor: '#fff',
    padding: '1em ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '2.5rem',
    minHeight: '20vh',
    [useTheme().breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      padding: '1em',
    },
  },
  textBox: {
    color: '#043e54',
    margin: '0.5em',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.5rem',
  },
  blueText: {
    color: '#043e54',
    fontSize: '2rem',
    [useTheme().breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
  formControl: {
    display: 'flex',
    width: '100%',
  },
  conoces: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Pricing(props) {
  const [palabras, setPalabras] = useState(null);

  const classes = useStyles();

  const handleChange = (e) => {
    setPalabras(e.target.value);
  };
  return (
    <section className={classes.grey}>
      <p className={classes.textBox}>COTIZADOR</p>

      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.conoces}>
          <InputLabel id="demo-simple-select-label">
						¿Conoces la cantidad de palabras que contiene tu libro? &gt;
          </InputLabel>
          <Select onChange={handleChange}>
            <MenuItem value="si">Si</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} className={classes.formContainer}>
          {palabras === 'si' ? (
            <WordPricingForm
              handleScroll={props.handleScroll}
              messageHandler={props.messageHandler}
            />
          ) : palabras === 'no' ? (
            <PricingForm
              handleScroll={props.handleScroll}
              messageHandler={props.messageHandler}
            />
          ) : null}
        </Grid>
      </Grid>
    </section>
  );
}

export default Pricing;
