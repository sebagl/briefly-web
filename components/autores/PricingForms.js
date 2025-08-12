import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';

const useStyles = makeStyles(() => ({
  wordsInput: {
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    textAlign: 'center',

    [useTheme().breakpoints.down('xs')]: {
      width: '77%',
      textAlign: 'center',
    },
  },
  textBox: {
    border: '2px solid #f49231 ',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5em',
  },
  blueText: {
    color: '#043e54',
    fontSize: '0.8rem',
    margin: '0.5em',
    [useTheme().breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

function WordPricingForm(props) {
  const [data, setData] = useState({});
  const [price, setPrice] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //8000 palabras por hora
    let hours = data.words / 8000;

    setPrice(parseInt(hours * 3675));
  };

  const handleEnviar = () => {
    const message = `Hola quiero converir mi obra en audiolibro. El libro contiene ${data.words} palabras.`;
    props.messageHandler(message);
    props.handleScroll();
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.wordsInput}>
            <TextField
              name="words"
              onChange={handleChange}
              className={classes.input}
              label="Cantidad de palabras"
              size="small"
            />
          </FormControl>
          <Box m={2}>
            <Button variant="outlined" type="submit" color="primary">
							Calcular
            </Button>
          </Box>
        </Grid>
      </Grid>
      {price && (
        <div className={classes.textBox}>
          <span className={classes.blueText}>
						El precio aproximado de tu audiolibro es de MX$ {price}.-
          </span>
          <hr />

          <Button variant="contained" onClick={handleEnviar} color="primary">
						¡Quiero producir mi audiolibro!
          </Button>
        </div>
      )}
    </form>
  );
}

function PricingForm(props) {
  const [data, setData] = useState({});
  const [price, setPrice] = useState(null);
  const [words, setWords] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //8500 palabras por hora
    let w = data.wordsInLine * data.lines * data.pages;

    let hours = w / 8000;

    setWords(w);
    setPrice(parseInt(hours * 3675));
  };

  const handleEnviar = () => {
    const message = `Hola quiero converir mi obra en audiolibro. El libro contiene ${words} palabras.`;
    props.messageHandler(message);
    props.handleScroll();
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Box m={1} className={classes.container}>
            <Typography variant="caption" color="textSecondary">
							1. Cuenta la cantidad de palabras que hay en una línea
            </Typography>{' '}
            <Typography variant="caption" color="textSecondary">
							2. Cuenta la cantidad de líneas que hay en una página
            </Typography>{' '}
            <Typography variant="caption" color="textSecondary">
							3. Revisa cuantas páginas tiene el libro
            </Typography>
          </Box>
          <FormControl className={classes.wordsInput}>
            <TextField
              name="wordsInLine"
              onChange={handleChange}
              className={classes.input}
              label="Palabras en una línea"
              size="small"
            />
          </FormControl>
          <FormControl className={classes.wordsInput}>
            <TextField
              name="lines"
              onChange={handleChange}
              className={classes.input}
              label="Líneas en una página"
              size="small"
            />
          </FormControl>
          <FormControl className={classes.wordsInput}>
            <TextField
              name="pages"
              onChange={handleChange}
              className={classes.input}
              label="Cantidad de páginas"
              size="small"
            />
          </FormControl>
          <Box m={2}>
            <Button variant="outlined" type="submit" color="primary">
							Calcular
            </Button>
          </Box>
        </Grid>
      </Grid>
      {price && (
        <div className={classes.textBox}>
          <span className={classes.blueText}>
						Tu libro contiene {words} palabras
          </span>
          <span className={classes.blueText}>
						El precio aproximado de tu audiolibro es de MX$ {price}.-
          </span>
          <hr />
          <Box m={2}>
            <Button variant="contained" onClick={handleEnviar} color="primary">
							¡Quiero producir mi audiolibro!
            </Button>
          </Box>
        </div>
      )}
    </form>
  );
}

export { PricingForm, WordPricingForm };
